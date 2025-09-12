import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Laptop, Monitor, Camera, ArrowLeft, ArrowRight, Shield } from "lucide-react";

interface DeviceRegistrationProps {
  onBack: () => void;
  onContinue: (deviceInfo: DeviceInfo) => void;
}

interface DeviceInfo {
  type: "laptop" | "smartphone" | "desktop" | "auto";
  brand?: string;
  model?: string;
  serial?: string;
  imei?: string;
}

const DeviceRegistration = ({ onBack, onContinue }: DeviceRegistrationProps) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({ type: "auto" });
  const [isAutoDetected, setIsAutoDetected] = useState(true);

  const deviceTypes = [
    { type: "laptop" as const, icon: Laptop, label: "Laptop" },
    { type: "smartphone" as const, icon: Smartphone, label: "Smartphone" },
    { type: "desktop" as const, icon: Monitor, label: "Desktop PC" },
  ];

  const handleAutoDetection = () => {
    // Simulate auto-detection
    setTimeout(() => {
      setDeviceInfo({
        type: "laptop",
        brand: "Dell",
        model: "Latitude 7420",
        serial: "ABCD1234567",
      });
      setIsAutoDetected(true);
    }, 1500);
  };

  const handleManualEntry = () => {
    setIsAutoDetected(false);
    setDeviceInfo({ type: "laptop" });
  };

  const canContinue = deviceInfo.brand && deviceInfo.model && (deviceInfo.serial || deviceInfo.imei);

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4 hover-lift">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Device Registration</h1>
            <p className="text-muted-foreground">Professional device identification</p>
          </div>
        </div>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              Register Your Device
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              We need to identify your device for accurate diagnostics and compliance reporting.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Auto Detection Section */}
            {isAutoDetected ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-secondary rounded-lg">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Auto-Detection</h3>
                    <p className="text-muted-foreground">
                      Running on device - automatic detection available
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30 px-4 py-2">
                    Recommended
                  </Badge>
                </div>
                
                <Button 
                  variant="security" 
                  className="w-full h-14 hover-glow" 
                  onClick={handleAutoDetection}
                >
                  <Camera className="h-5 w-5 mr-3" />
                  Auto-Detect Device Information
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-4 text-muted-foreground font-medium">or</span>
                  </div>
                </div>

                <Button 
                  variant="professional" 
                  className="w-full h-12" 
                  onClick={handleManualEntry}
                >
                  Enter Manually
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Device Type Selection */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Device Type</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {deviceTypes.map((device) => (
                      <Button
                        key={device.type}
                        variant={deviceInfo.type === device.type ? "default" : "outline"}
                        className="h-24 flex-col hover-lift"
                        onClick={() => setDeviceInfo({ ...deviceInfo, type: device.type })}
                      >
                        <device.icon className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">{device.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Manual Entry Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="brand" className="font-medium">Brand</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Dell, Apple, Samsung"
                        value={deviceInfo.brand || ""}
                        onChange={(e) => setDeviceInfo({ ...deviceInfo, brand: e.target.value })}
                        className="mt-2 h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="model" className="font-medium">Model</Label>
                      <Input
                        id="model"
                        placeholder="e.g., Latitude 7420"
                        value={deviceInfo.model || ""}
                        onChange={(e) => setDeviceInfo({ ...deviceInfo, model: e.target.value })}
                        className="mt-2 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serial" className="font-medium">
                      {deviceInfo.type === "smartphone" ? "IMEI" : "Serial Number"}
                    </Label>
                    <div className="flex gap-3 mt-2">
                      <Input
                        id="serial"
                        placeholder={deviceInfo.type === "smartphone" ? "Enter IMEI" : "Enter serial number"}
                        value={deviceInfo.type === "smartphone" ? deviceInfo.imei || "" : deviceInfo.serial || ""}
                        onChange={(e) => {
                          if (deviceInfo.type === "smartphone") {
                            setDeviceInfo({ ...deviceInfo, imei: e.target.value });
                          } else {
                            setDeviceInfo({ ...deviceInfo, serial: e.target.value });
                          }
                        }}
                        className="h-12"
                      />
                      <Button variant="outline" size="icon" className="h-12 w-12 hover-lift">
                        <Camera className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="professional" 
                  className="w-full" 
                  onClick={() => {
                    setIsAutoDetected(true);
                    setDeviceInfo({ type: "auto" });
                  }}
                >
                  Switch to Auto-Detection
                </Button>
              </div>
            )}

            {/* Detected Device Info Display */}
            {deviceInfo.brand && (
              <Card className="bg-success/5 border-success/20 shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3 text-success flex items-center">
                    <div className="p-1 bg-success/10 rounded mr-2">
                      <Shield className="h-4 w-4" />
                    </div>
                    Device Detected
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <p><span className="font-semibold text-foreground">Type:</span> <span className="text-muted-foreground">{deviceInfo.type.charAt(0).toUpperCase() + deviceInfo.type.slice(1)}</span></p>
                    <p><span className="font-semibold text-foreground">Brand:</span> <span className="text-muted-foreground">{deviceInfo.brand}</span></p>
                    <p><span className="font-semibold text-foreground">Model:</span> <span className="text-muted-foreground">{deviceInfo.model}</span></p>
                    {deviceInfo.serial && <p><span className="font-semibold text-foreground">Serial:</span> <span className="text-muted-foreground">{deviceInfo.serial}</span></p>}
                    {deviceInfo.imei && <p><span className="font-semibold text-foreground">IMEI:</span> <span className="text-muted-foreground">{deviceInfo.imei}</span></p>}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              variant="scan" 
              size="xl" 
              className="w-full hover-glow"
              onClick={() => onContinue(deviceInfo)}
              disabled={!canContinue}
            >
              Continue to Scan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceRegistration;