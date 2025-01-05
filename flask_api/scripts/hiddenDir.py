import asyncio
import aiohttp


async def fetch_url(session, url, semaphore, home_len=None):
    async with semaphore:
        try:
            headers = {
                "User-Agent": "HiddenTraversalBot/1.0 (Contact: example@example.com)"
            }
            await asyncio.sleep(0.2)  # Delay
            async with session.get(url, headers=headers, timeout=10) as response:
                if response.status in [200, 301, 302, 403, 401]:
                    try:
                        text = await response.text()  # Attempt to decode the response
                        if (
                            home_len is not None
                            and response.status == 200
                            and len(text) == home_len
                        ):
                            print(f"Filtered duplicate content for URL: {url}")
                            return None
                        return url  # Return the URL if valid
                    except UnicodeDecodeError:
                        # Binary or non-UTF-8 content, still return the URL
                        print(f"Non-UTF-8 content for URL: {url}")
                        return url
        except (asyncio.TimeoutError, aiohttp.ClientError):
            return None


async def hidden_dir(
    base_url, wordlist_path, extensions=None, max_concurrent=10, home_len=None
):
    if extensions is None:
        extensions = []

    with open(wordlist_path, "r") as file:
        paths = [line.strip() for line in file if line.strip()]

    urls_to_test = []
    for word in paths:
        urls_to_test.append(f"{base_url}/{word}")
        for ext in extensions:
            urls_to_test.append(f"{base_url}/{word}.{ext}")

    semaphore = asyncio.Semaphore(max_concurrent)

    async with aiohttp.ClientSession() as session:
        tasks = [
            fetch_url(session, url, semaphore, home_len=home_len)
            for url in urls_to_test
        ]
        results = await asyncio.gather(*tasks)

    return [url for url in results if url is not None]
