import { useState } from "react";
import Welcome from "@/components/Welcome";
import DeviceRegistration from "@/components/DeviceRegistration";
import ScanExecution from "@/components/ScanExecution";
import ScanResults from "@/components/ScanResults";
import LearnMore from "@/components/LearnMore";

type AppState = "welcome" | "registration" | "scanning" | "results";

interface DeviceInfo {
  type: "laptop" | "smartphone" | "desktop" | "auto";
  brand?: string;
  model?: string;
  serial?: string;
  imei?: string;
}

interface ScanResultsData {
  overallScore: number;
  grade: "Excellent" | "Good" | "Fair" | "Poor";
  components: ComponentScore[];
  recommendation: "Resale" | "Refurbish" | "Recycle" | "Destroy";
  certificateId: string;
}

interface ComponentScore {
  component: string;
  score: number;
  status: "pass" | "warning" | "fail";
  details: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [scanResults, setScanResults] = useState<ScanResultsData | null>(null);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleStartScan = () => {
    setCurrentState("registration");
  };

  const handleDeviceRegistered = (info: DeviceInfo) => {
    setDeviceInfo(info);
    setCurrentState("scanning");
  };

  const handleScanComplete = (results: ScanResultsData) => {
    setScanResults(results);
    setCurrentState("results");
  };

  const handleBackToWelcome = () => {
    setCurrentState("welcome");
    setDeviceInfo(null);
    setScanResults(null);
  };

  const handleBackToRegistration = () => {
    setCurrentState("registration");
  };

  const handleBackToScanning = () => {
    setCurrentState("scanning");
  };

  const handleStartNewScan = () => {
    setDeviceInfo(null);
    setScanResults(null);
    setCurrentState("registration");
  };

  return (
    <div className="min-h-screen">
      {currentState === "welcome" && (
        <Welcome 
          onStartScan={handleStartScan}
          onLearnMore={() => setShowLearnMore(true)}
        />
      )}
      
      {currentState === "registration" && (
        <DeviceRegistration 
          onBack={handleBackToWelcome}
          onContinue={handleDeviceRegistered}
        />
      )}
      
      {currentState === "scanning" && deviceInfo && (
        <ScanExecution 
          onBack={handleBackToRegistration}
          onComplete={handleScanComplete}
          deviceInfo={deviceInfo}
        />
      )}
      
      {currentState === "results" && scanResults && (
        <ScanResults 
          results={scanResults}
          onBack={handleBackToScanning}
          onStartNew={handleStartNewScan}
        />
      )}

      {showLearnMore && (
        <LearnMore 
          onClose={() => setShowLearnMore(false)}
          onStartScan={() => {
            setShowLearnMore(false);
            handleStartScan();
          }}
        />
      )}
    </div>
  );
};

export default Index;