import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Cpu, Download, ArrowRight, Lock, Award } from "lucide-react";
import heroImage from "@/assets/hero-devices.jpg";

const Welcome = ({ onStartScan, onLearnMore }: { onStartScan: () => void; onLearnMore: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl mr-4">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
              Revolve
            </h1>
          </div>
          <p className="text-2xl text-balance font-medium text-muted-foreground mb-4">
            Secure Device Recycling & Resale Platform
          </p>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            Perform automated diagnostics, secure data wiping, and value scoring for PCs, laptops, 
            and smartphones with enterprise-grade security and compliance.
          </p>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center mb-16">
          <div className="relative hover-lift">
            <img 
              src={heroImage} 
              alt="Professional device diagnostics setup showing laptops, smartphones, and desktop computers"
              className="rounded-xl shadow-lg max-w-5xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-xl"></div>
          </div>
        </div>

        {/* Professional Process Overview */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Enterprise-Grade Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five-step professional workflow ensuring compliance, security, and comprehensive analysis
            </p>
          </div>

          {/* Professional Process Steps */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold text-sm">OS & Hardware Detection</h3>
              <p className="text-xs text-muted-foreground">Cross-platform device identification</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold text-sm">NIST SP 800-88 Wipe</h3>
              <p className="text-xs text-muted-foreground">Clear/Purge/Cryptographic methods</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold text-sm">Certificate Generation</h3>
              <p className="text-xs text-muted-foreground">Tamper-proof verification</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">4</span>
              </div>
              <h3 className="font-semibold text-sm">Diagnostic Analysis</h3>
              <p className="text-xs text-muted-foreground">Component health scoring</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">5</span>
              </div>
              <h3 className="font-semibold text-sm">Compliance Dashboard</h3>
              <p className="text-xs text-muted-foreground">EPR records & audit trail</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-muted-foreground">
          <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
            <Lock className="h-5 w-5 mr-3 text-primary" />
            <span className="text-sm font-semibold">NIST SP 800-88 Compliant</span>
          </div>
          <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
            <Award className="h-5 w-5 mr-3 text-accent" />
            <span className="text-sm font-semibold">Enterprise Grade Security</span>
          </div>
          <div className="flex items-center bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
            <Shield className="h-5 w-5 mr-3 text-success" />
            <span className="text-sm font-semibold">Tamper-Proof Certificates</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            variant="scan" 
            size="xl"
            onClick={onStartScan}
            className="min-w-72 hover-glow"
          >
            Start Device Scan
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button 
            variant="professional" 
            size="xl"
            onClick={onLearnMore}
            className="min-w-56"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;