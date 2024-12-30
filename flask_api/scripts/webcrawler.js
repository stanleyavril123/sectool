import { chromium } from "playwright";
import robotsParser from "robots-parser"; // Parse robots.txt
import fetch from "node-fetch"; // Make HTTP requests

class WebCrawler {
  constructor(
    domain,
    ports = [],
    maxConcurrent = 3,
    delay = 1000,
    maxDepth = 3,
    maxPages = 100
  ) {
    /**
     * @param domain: The target domain to crawl.
     * @param ports: Array of dictionaries with open ports and protocols, e.g., [{'80': 'http'}, {'443': 'https'}]
     * @param maxConcurrent: Number of concurrent crawling pages.
     * @param delay: Delay between requests in milliseconds.
     * @param maxDepth: Maximum depth to crawl.
     * @param maxPages: Maximum number of pages to crawl.
     */
    this.domain = domain;
    this.delay = delay;
    this.ports = ports || [];
    this.visitedUrls = new Set();
    this.urlsToVisit = [];
    this.maxConcurrent = maxConcurrent;
    this.maxDepth = maxDepth;
    this.maxPages = maxPages;
    this.urlDepth = new Map();
    this.activeRequests = 0;
    this.browser = null;
    this.userAgent = "WebCrawlerBot";
    this.robotsTxts = new Map(); // pour qu'on store les regle du robots.txt
    this.initUrls();
  }

  // va creer les bases url a partir de la liste des ports ( [{'80': 'http'}, {'443': 'https'}] ) et les ajouts a un set
  initUrls() {
    const baseUrls = new Set();
    for (const portInfo of this.ports) {
      for (const [port, protocol] of Object.entries(portInfo)) {
        let baseUrl;
        if (port === "80") {
          baseUrl = `http://${this.domain}`;
        } else if (port === "443") {
          baseUrl = `https://${this.domain}`;
        } else {
          baseUrl = `${protocol}://${this.domain}:${port}`;
        }
        baseUrls.add(baseUrl);
      }
    }
    // Also add default base URLs
    baseUrls.add(`http://${this.domain}`);
    baseUrls.add(`https://${this.domain}`);

    for (const baseUrl of baseUrls) {
      const normalizedUrl = this.normalizeUrl(baseUrl);
      this.urlsToVisit.push({ url: normalizedUrl, depth: 0 });
      this.urlDepth.set(normalizedUrl, 0);
    }
    console.error(
      `Initialized URLs to visit: ${Array.from(baseUrls).join(", ")}`
    );
  }

  //  ensures each URL is formatted consistently.
  normalizeUrl(href) {
    try {
      const parsedUrl = new URL(href);
      return parsedUrl.toString();
    } catch (e) {
      return null;
    }
  }

  // verifie si le url appartient au domaine
  isValidUrl(href) {
    const normalizedUrl = this.normalizeUrl(href);
    if (!normalizedUrl) {
      return false;
    }
    try {
      const parsedUrl = new URL(normalizedUrl);
      return (
        ["http:", "https:"].includes(parsedUrl.protocol) &&
        parsedUrl.hostname === this.domain
      );
    } catch (e) {
      return false;
    }
  }

  // check si robots.txt nous permet de crawl la page
  async canCrawl(pageUrl) {
    const parsedUrl = new URL(pageUrl);
    const robotsUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}/robots.txt`;

    if (!this.robotsTxts.has(robotsUrl)) {
      try {
        console.error(`Fetching robots.txt from: ${robotsUrl}`);
        const response = await fetch(robotsUrl);
        if (response.ok) {
          const robotsTxtContent = await response.text();
          const robots = robotsParser(robotsUrl, robotsTxtContent);
          this.robotsTxts.set(robotsUrl, robots);
          console.error(`Parsed robots.txt from: ${robotsUrl}`);
        } else {
          // Assume allowed if cannot fetch robots.txt
          this.robotsTxts.set(robotsUrl, null);
          console.error(
            `robots.txt not found at: ${robotsUrl}. Assuming allowed.`
          );
        }
      } catch (error) {
        // Assume allowed if error occurs
        this.robotsTxts.set(robotsUrl, null);
        console.error(
          `Error fetching robots.txt from: ${robotsUrl}. Assuming allowed.`
        );
      }
    }

    const robots = this.robotsTxts.get(robotsUrl);
    if (robots) {
      const allowed = robots.isAllowed(pageUrl, this.userAgent);
      console.error(`Can crawl ${pageUrl}: ${allowed}`);
      return allowed;
    } else {
      console.error(`No robots.txt rules for ${pageUrl}. Assuming allowed.`);
      return true;
    }
  }
  // le main logic du crawler
  async crawl() {
    this.browser = await chromium.launch({
      headless: true, // le window va etre invisible
    });

    return new Promise((resolve, reject) => {
      const crawlNext = async () => {
        console.error(
          `Active Requests: ${this.activeRequests}, URLs to Visit: ${this.urlsToVisit.length}`
        );

        // Check if we've reached the maximum number of pages
        if (this.visitedUrls.size >= this.maxPages) {
          console.error("Reached maximum page limit.");
          resolve(Array.from(this.visitedUrls));
          await this.browser.close();
          return;
        }

        while (
          this.activeRequests < this.maxConcurrent &&
          this.urlsToVisit.length > 0
        ) {
          const { url: currentUrl, depth: currentDepth } =
            this.urlsToVisit.shift();

          // Check if URL is already visited
          if (this.visitedUrls.has(currentUrl)) {
            continue;
          }

          // Check if we've reached the maximum depth
          if (currentDepth > this.maxDepth) {
            console.error(`Skipping ${currentUrl} as it exceeds max depth.`);
            continue;
          }

          // Check robots.txt permissions
          if (!(await this.canCrawl(currentUrl))) {
            console.error(
              `Skipping ${currentUrl} due to robots.txt restrictions.`
            );
            continue;
          }

          this.visitedUrls.add(currentUrl);
          this.activeRequests += 1;
          console.error(`Crawling: ${currentUrl} at depth ${currentDepth}`);

          this.crawlPage(currentUrl, currentDepth)
            .then(() => {
              this.activeRequests -= 1;
              setTimeout(crawlNext, this.delay);
            })
            .catch((error) => {
              console.error(`Failed to crawl ${currentUrl}: ${error}`);
              this.activeRequests -= 1;
              setTimeout(crawlNext, this.delay);
            });
        }

        if (this.activeRequests === 0 && this.urlsToVisit.length === 0) {
          console.error("Crawling complete.");
          resolve(Array.from(this.visitedUrls));
          this.browser.close().then(() => {
            console.error("Playwright browser closed.");
          });
        }
      };

      crawlNext();
    });
  }

  async crawlPage(pageUrl, currentDepth) {
    // Create a new browser context with the desired user agent
    const context = await this.browser.newContext({
      userAgent: this.userAgent,
    });

    // Create a new page from the context
    const page = await context.newPage();

    try {
      // Suppress unnecessary console messages
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          // Optionally log the error message
          // console.error(`PAGE ERROR: ${msg.text()}`);
        }
      });

      console.error(`Navigating to: ${pageUrl}`);

      // Navigate to the page
      // Attend quil ny a plus de network req => la page a load au complete
      await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 60000 });

      // delay de 2 sec pour assurer que le js a load
      await page.waitForTimeout(2000);

      // Extract all anchor tags <a><a/>
      const links = await page.$$eval("a", (anchors) =>
        anchors
          .map((a) => a.href)
          .filter((href) => href && !href.startsWith("#"))
      );

      const uniqueLinks = new Set();
      for (const href of links) {
        const normalizedHref = this.normalizeUrl(href);
        if (this.isValidUrl(normalizedHref)) {
          uniqueLinks.add(normalizedHref);
        }
      }

      console.error(`Found ${uniqueLinks.size} links on ${pageUrl}`);

      for (const link of uniqueLinks) {
        const linkDepth = currentDepth + 1;

        // Check if the link has already been visited or queued
        if (
          !this.visitedUrls.has(link) &&
          !this.urlsToVisit.some((item) => item.url === link)
        ) {
          this.urlsToVisit.push({ url: link, depth: linkDepth });
          this.urlDepth.set(link, linkDepth);
          console.error(`Queued for crawling: ${link} at depth ${linkDepth}`);
        }
      }
    } catch (error) {
      console.error(`Error crawling ${pageUrl}: ${error.message}`);
    } finally {
      await page.close();
      await context.close();
      console.error(`Closed page: ${pageUrl}`);
    }
  }
}

export default WebCrawler;
