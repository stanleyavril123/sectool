import React from "react";
import scanData from "./scan.json";
import ScanBox from "../components/ScanBox";
import OverviewBox from "../components/OverviewBox";
import ImprovementsBox from "../components/ImprovementsBox";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="page">
      <div className="dashboard">
        <ImprovementsBox />
        <ScanBox scanData={scanData} />
        <OverviewBox />
      </div>
    </div>
  );
}

export default Dashboard;
