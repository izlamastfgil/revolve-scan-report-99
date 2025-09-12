import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Battery, 
  Camera, 
  Trash2, 
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Pause,
  Play
} from "lucide-react";
import scanImage from "@/assets/scan-illustration.jpg";

interface ScanExecutionProps {
  onBack: () => void;
  onComplete: (results: ScanResults) => void;
  deviceInfo: any;
}

interface ScanStep {
  id: string;
  label: string;
  description: string;
  icon: any;
  status: "pending" | "running" | "completed" | "error";
  progress: number;
}

interface ScanResults {
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

const ScanExecution = ({ onBack, onComplete, deviceInfo }: ScanExecutionProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const [scanSteps, setScanSteps] = useState<ScanStep[]>([
    {
      id: "os-detection",
      label: "OS & Hardware Detection",
      description: "Cross-platform identification: Windows/Linux/Android device analysis",
      icon: Shield,
      status: "pending",
      progress: 0
    },
    {
      id: "nist-wipe",
      label: "NIST SP 800-88 Data Wipe",
      description: "Implementing Clear/Purge/Cryptographic Erase methods with verification",
      icon: Trash2,
      status: "pending",
      progress: 0
    },
    {
      id: "certificate",
      label: "Certificate Generation",
      description: "Creating tamper-proof certificate with unique ID, hash & timestamps",
      icon: CheckCircle,
      status: "pending",
      progress: 0
    },
    {
      id: "diagnostics",
      label: "Automated Diagnostics",
      description: "Component health analysis and refurbish/recycle decision matrix",
      icon: Cpu,
      status: "pending",
      progress: 0
    },
    {
      id: "compliance",
      label: "Compliance Dashboard",
      description: "EPR records, audit trail and device journey timeline generation",
      icon: HardDrive,
      status: "pending",
      progress: 0
    }
  ]);

  const overallProgress = scanSteps.reduce((acc, step) => acc + step.progress, 0) / scanSteps.length;

  useEffect(() => {
    if (isScanning && !isPaused) {
      const interval = setInterval(() => {
        setScanSteps(prev => {
          const updated = [...prev];
          const current = updated[currentStep];
          
          if (current && current.status !== "completed") {
            if (current.status === "pending") {
              current.status = "running";
            }
            
            current.progress = Math.min(100, current.progress + Math.random() * 15 + 5);
            
            if (current.progress >= 100) {
              current.status = "completed";
              current.progress = 100;
              
              if (currentStep < updated.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                // Scan completed
                setIsScanning(false);
                setTimeout(() => {
                  const mockResults: ScanResults = {
                    overallScore: 87,
                    grade: "Good",
                    components: [
                      { component: "CPU Performance", score: 92, status: "pass", details: "Intel i7-10750H - Optimal performance metrics" },
                      { component: "Memory Integrity", score: 88, status: "pass", details: "16GB DDR4 - All memory banks operational" },
                      { component: "Storage Health", score: 85, status: "pass", details: "512GB NVMe - 15% wear level, good retention" },
                      { component: "Battery Cycle", score: 76, status: "warning", details: "847 cycles completed, 74% capacity remaining" },
                      { component: "Display Quality", score: 94, status: "pass", details: "15.6\" FHD - No defects, optimal brightness" },
                      { component: "Thermal Management", score: 89, status: "pass", details: "Cooling system operational, no throttling" },
                      { component: "Data Sanitization", score: 100, status: "pass", details: "NIST SP 800-88 Purge method - Verified complete" }
                    ],
                    recommendation: "Refurbish",
                    certificateId: "RVL-MFECLNW2"
                  };
                  onComplete(mockResults);
                }, 2000);
              }
            }
          }
          
          return updated;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isScanning, isPaused, currentStep, onComplete]);

  const handleStartScan = () => {
    setShowWarning(true);
  };

  const confirmScan = () => {
    setShowWarning(false);
    setIsScanning(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleCancel = () => {
    if (scanSteps.some(step => step.id === "wipe" && step.status === "running")) {
      alert("Cannot cancel during data wipe process for security compliance.");
      return;
    }
    setIsScanning(false);
    setIsPaused(false);
    setScanSteps(prev => prev.map(step => ({ ...step, status: "pending", progress: 0 })));
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} disabled={isScanning} className="mr-4 hover-lift">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Device Scan & Secure Wipe</h1>
            <p className="text-muted-foreground font-medium">
              {deviceInfo.brand} {deviceInfo.model} - {deviceInfo.serial || deviceInfo.imei}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scan Control Panel */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  Scan Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {!isScanning ? (
                  <Button 
                    variant="scan" 
                    size="xl"
                    className="w-full hover-glow"
                    onClick={handleStartScan}
                  >
                    <Shield className="mr-3 h-6 w-6" />
                    Start Scan & Secure Wipe
                  </Button>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Button 
                        variant={isPaused ? "default" : "secondary"}
                        onClick={handlePauseResume}
                        className="flex-1 hover-lift"
                      >
                        {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                        {isPaused ? "Resume" : "Pause"}
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={scanSteps.some(step => step.id === "wipe" && step.status === "running")}
                        className="hover-lift"
                      >
                        Cancel
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Overall Progress</span>
                        <span>{Math.round(overallProgress)}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-4 shadow-sm" />
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <img 
                    src={scanImage} 
                    alt="Device scanning illustration showing diagnostic process"
                    className="rounded-xl shadow-security max-w-full h-56 object-cover mx-auto hover-lift"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-warning/30 bg-warning/5 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-warning-foreground">Security Notice</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Data wipe process is irreversible and complies with NIST SP 800-88 standards. 
                      Ensure all important data is backed up before proceeding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scan Progress Steps */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Scan Progress</CardTitle>
                <p className="text-muted-foreground">Real-time diagnostic status</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={step.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-secondary border border-border/50 hover-lift">
                        <div className={`p-3 rounded-xl transition-all ${
                          step.status === "completed" ? "bg-success/10 text-success shadow-sm" :
                          step.status === "running" ? "bg-primary/10 text-primary animate-pulse shadow-sm" :
                          step.status === "error" ? "bg-destructive/10 text-destructive shadow-sm" :
                          "bg-muted/50 text-muted-foreground"
                        }`}>
                          <StepIcon className="h-6 w-6" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold truncate">{step.label}</h4>
                            <Badge variant={
                              step.status === "completed" ? "default" :
                              step.status === "running" ? "secondary" :
                              "outline"
                            } className="px-3 py-1">
                              {step.status === "completed" ? "Done" :
                               step.status === "running" ? "Running" :
                               step.status === "error" ? "Error" :
                               "Pending"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                          <Progress value={step.progress} className="h-3 shadow-sm" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Warning Dialog */}
        {showWarning && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="max-w-lg w-full shadow-glow border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-warning text-xl">
                  <div className="p-2 bg-warning/10 rounded-lg mr-3">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  Confirm Data Wipe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  This process will permanently erase all data on the device using NIST SP 800-88 
                  compliant methods. This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <Button variant="destructive" onClick={confirmScan} className="flex-1 hover-lift">
                    I Understand, Continue
                  </Button>
                  <Button variant="outline" onClick={() => setShowWarning(false)} className="flex-1 hover-lift">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanExecution;