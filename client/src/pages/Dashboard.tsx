import React from "react";
import scanData from "./scan.json";
import ScanBox from "../components/sidebar/ScanBox";
import OverviewBox from "../components/dashboard/OverviewBox";
import ImprovementsBox from "../components/dashboard/ImprovementsBox";
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
