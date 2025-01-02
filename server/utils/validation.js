export function validateTarget(target) {
	const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
	const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

	if (!target || (!ipRegex.test(target) && !urlRegex.test(target))) {
		throw new Error("Invalid target: Please provide a valid URL or IP address.");
	}

	if (urlRegex.test(target)) {
		const match = target.match(urlRegex);
		return match[0]; // si url, retourne url stricte ex. test.com
	}
	
	return target; // sinon retourne adresse IP
}
  