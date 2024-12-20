import React from "react";
import "./Dashboard.css";

function Dashboard () {

  function getWelcomeMessage(): string {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      return "Good Morning"
    }
    else if (hour < 18) {
      return "Good Afternoon"
    }
    else {
      return "Good Evening"
    }
  }

  const Scan = {domain: "https://Hello.com", date: "2024-12-20", tests: [
    {type: "DB Vulnerabilities", failedTestAmount: "3", tests:
      [{type: "SQL injection", info: "Injection on /Login page. Payload='AND true'", level: "Critical"},
      {type: "SQL injection", info: "Injection on /Admin page. Payload='OR 1=1'", level: "Critical"},
      {type: "SQL injection", info: "Injection on /Login page. Payload='AND 1083=1083 AND (1427=1427'", level: "Warning"}]
    }, 
    {type: "Network Vulnerabilites", failedTestAmount: "2", tests:
      [{type: "Open port", info: "Open port 22", level: "Warning"},
       {type: "Firewall", info: "Absence of rate limiting. Potential DDOS risk", level: "Critical"}]
      },
    {type: "Script Vulnerabilities", failedTestAmount: "6", tests:
      [{type: "XSS injection", info: "Injection on /Login page. Payload='<scriptx20type=text/javascript>javascript:alert(1);</script>'", level: "Warning"},
       {type: "XSS injection", info: "Injection on /Cart page. Payload='<image/src/onerror=prompt(8)>' 1", level: "Warning"},
       {type: "XSS injection", info: "Injection on /Cart page. Payload='<image/src/onerror=prompt(8)>' 2", level: "Critical"},
       {type: "XSS injection", info: "Injection on /Cart page. Payload='<image/src/onerror=prompt(8)>' 3", level: "Warning"},
       {type: "XSS injection", info: "Injection on /Cart page. Payload='<image/src/onerror=prompt(8)>' 4", level: "Warning"},
       {type: "XSS injection", info: "Injection on /Cart page. Payload='<script ~~~>alert(0%0)</script ~~~>'", level: "Critical"}]
      }]}
  
  return (
    <div className="dashboard">
      <h1>{getWelcomeMessage()}</h1>
      <h2>Latest Scan on {Scan.domain} on {Scan.date}</h2>
      <div className="dashboard-rectangle">
        {Scan.tests.map((test) => (
          <div key={test.type} className="dashboard-box">
            <h3 className="vul-name">{test.type}</h3>
            <div className="dashboard-tests">
              <h4>{test.failedTestAmount} Tests failed</h4>
              {test.tests.map((test) => (
                <div key={test.info} className={test.level}>
                  <p className="vul-text">{test.type}</p>
                  <li className="vul-text">{test.info}</li>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
)}

export default Dashboard;
