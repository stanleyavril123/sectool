import "./ScanBox.css";

type TestDetails = {
  type: string;
  info: string;
  level: string;
};
  
type Test = {
  type: string;
  failedTestAmount: string;
  tests: TestDetails[];
};

type Scan = {
  domain: string;
  date: string;
  tests: Test[];
};

type OverviewProps = {
  scanData: Scan;
};

function ScanBox({ scanData }: OverviewProps) {

    return (
          <div className="scan">
          <h2 className="title">Latest Scan</h2>
          <h4 className="title info">{scanData.domain} on {scanData.date}</h4>
          <div className="dashboard-rectangle">
          {scanData.tests.map((test : Test) => (
            <div key={test.type} className="dashboard-box">
              <h3 className="vul-name">{test.type}</h3>
              <div className="dashboard-tests">
                <h4>{test.failedTestAmount} Tests failed</h4>
                {test.tests.map((testDetail ) => (
                  <div key={testDetail.info} className={testDetail.level}>
                    <p className="vul-text">{testDetail.type}</p>
                    <li className="vul-text">{testDetail.info}</li>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
    )
}

export default ScanBox