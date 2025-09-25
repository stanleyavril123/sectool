import React from "react";
import "./ScanResults.css";

type NmapHost = {
  addresses?: { ipv4?: string };
  hostnames?: { name: string; type?: string }[];
  status?: { state?: string; reason?: string };
  tcp?: Record<
    string,
    {
      name?: string;
      state?: string;
      product?: string;
      version?: string;
    }
  >;
};

type ScanData = {
  status: string;
  timestamp: string;
  tools: any[];
};

function getNmap(data: ScanData) {
  const nmapObj = data?.tools?.[0] ?? {};
  const ip = Object.keys(nmapObj)[0];
  const host: NmapHost = ip ? nmapObj[ip] : {};
  return { ip, host };
}

function getCrawler(data: ScanData) {
  return data?.tools?.[1] ?? {};
}

const ScanResults: React.FC<{ data: ScanData }> = ({ data }) => {
  const { ip, host } = getNmap(data);
  const crawler = getCrawler(data);

  return (
    <div className="results">
      <div className="results-header">
        <div>
          <div className="results-title">Scan results</div>
          <div className="results-sub">
            {new Date(data.timestamp).toLocaleString()}
          </div>
        </div>
        {ip && <div className="results-badge">{ip}</div>}
      </div>

      {/* NMAP */}
      <section className="card">
        <div className="card-title">Ports & services (Nmap)</div>
        {!host?.tcp ? (
          <div className="muted">No open TCP ports reported.</div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Port</th>
                <th>Service</th>
                <th>State</th>
                <th>Product</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(host.tcp).map(([port, info]) => (
                <tr key={port}>
                  <td>{port}</td>
                  <td>{info.name || "-"}</td>
                  <td>{info.state || "-"}</td>
                  <td>{info.product || "-"}</td>
                  <td>{info.version || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {(host?.hostnames?.length ?? 0) > 0 && (
          <div className="chips">
            {host.hostnames!.map((h, i) => (
              <span className="chip" key={i}>
                {h.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* CRAWLER */}
      <section className="card">
        <div className="card-title">Crawled URLs</div>
        {!crawler?.crawledUrls?.length ? (
          <div className="muted">No URLs returned.</div>
        ) : (
          <ul className="url-list">
            {crawler.crawledUrls.map((u: string, i: number) => (
              <li key={i}>
                <a href={u} target="_blank" rel="noreferrer">
                  {u}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ScanResults;
