import argparse
import requests
import json
import concurrent.futures

def fetch_url(url, home_len=None):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code in [200, 301, 302, 403, 401]:
            if home_len is not None and response.status_code == 200 and len(response.text) == home_len:
                return None 
            return url
    except requests.RequestException:
        return None

def scan_url(base_url, wordlist, extensions, max_workers=20, home_len=None):
    """Scans URLs in parallel for faster results."""
    urls_to_test = []

    for word in wordlist:
        urls_to_test.append(f"{base_url}{word}")
        for ext in extensions:
            urls_to_test.append(f"{base_url}{word}.{ext}")

    found_urls = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = executor.map(lambda u: fetch_url(u, home_len=home_len), urls_to_test)

    for result in results:
        if result is not None:
            found_urls.append(result)

    return found_urls

def main():
    parser = argparse.ArgumentParser(description="Directory and file discovery tool")
    parser.add_argument("-u", "--url", required=True, help="Base URL to scan")
    parser.add_argument("-w", "--wordlist", required=True, help="Path to wordlist")
    parser.add_argument("-e", "--extensions", required=True, help="Comma-separated list of extensions")
    parser.add_argument("-t", "--threads", default=20, type=int, help="Number of threads for parallel scanning")

    args = parser.parse_args()

    with open(args.wordlist, 'r') as f:
        wordlist = [line.strip() for line in f if line.strip()]

    extensions = [ext.strip() for ext in args.extensions.split(",") if ext.strip()]

    try:
        home_response = requests.get(args.url, timeout=5)
        home_len = len(home_response.text) if home_response.status_code == 200 else None
    except requests.RequestException:
        home_len = None

    try:
        found_urls = scan_url(args.url, wordlist, extensions, max_workers=args.threads, home_len=home_len)
        output = {
            "dirTraversalUrls": found_urls,
            "success": True,
            "tool": "dirTraversal",
            "errors": ""
        }
    except Exception as e:
        output = {
            "dirTraversalUrls": [],
            "success": False,
            "tool": "dirTraversal",
            "errors": str(e)
        }

    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    main()

