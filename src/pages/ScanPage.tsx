import React from "react";
import PageContainer from "../components/containers/PageContainer";
import ScanBar from "../components/scan/ScanBar";
import ScanLog from "../components/scan/ScanProgressLog";

const ScanPage: React.FC = () =>  {
  return (
    <PageContainer>
      <ScanBar/>
      <ScanLog/>
    </PageContainer>
  );
}

export default ScanPage;
