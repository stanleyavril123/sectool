const getWebServer = (nmapResponse) => {
  const portList = [];
  try {
    for (const ip in nmapResponse) {
      if (nmapResponse.hasOwnProperty(ip)) {
        const tcpPorts = nmapResponse[ip].tcp;
        for (const [portid, details] of Object.entries(tcpPorts)) {
          const serviceName = details.name;
          console.log(`Processing port ${portid}: ${serviceName}`);
          if (serviceName === "http" || serviceName === "https") {
            const portInfo = { [portid]: serviceName };
            portList.push(portInfo);
          } else {
            console.log(`No relevant service for port ${portid}`);
          }
        }
        return {
          domain:
            nmapResponse[ip].hostnames[0]?.name ||
            nmapResponse[ip].addresses.ipv4,
          ports: portList,
        };
      }
    }
  } catch (error) {
    console.error(`Error processing ports: ${error.message}`);
    return null;
  }
  return null;
};

export default getWebServer;
