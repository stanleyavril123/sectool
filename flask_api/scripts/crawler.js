import WebCrawler from "./webcrawler.js";

(async () => {
  try {
    const args = process.argv.slice(2);
    const domain = args[0];
    const ports = JSON.parse(args[1]);
    const maxDepth = args[2] !== undefined ? parseInt(args[2], 10) : 3;
    const maxPages = args[3] !== undefined ? parseInt(args[3], 10) : 100;

    const crawler = new WebCrawler(domain, ports, 3, 1000, maxDepth, maxPages);
    console.error("DEBUG: Starting web crawl...");
    const results = await crawler.crawl();
    console.log(
      JSON.stringify({
        tool: "webcrawler",
        success: true,
        crawledUrls: results,
      })
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        tool: "webcrawler",
        success: false,
        error: error.message,
      })
    );
    process.exit(1);
  }
})();
