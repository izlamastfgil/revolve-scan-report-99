import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X,
  Shield, 
  CheckCircle, 
  Award, 
  Lock,
  Cpu,
  HardDrive,
  Smartphone,
  Monitor,
  ArrowRight
} from "lucide-react";

interface LearnMoreProps {
  onClose: () => void;
  onStartScan: () => void;
}

const LearnMore = ({ onClose, onStartScan }: LearnMoreProps) => {
  const features = [
    {
      icon: Shield,
      title: "NIST SP 800-88 Compliance",
      description: "Military-grade data wiping that meets federal security standards for complete data destruction."
    },
    {
      icon: Cpu,
      title: "Comprehensive Hardware Testing",
      description: "Full diagnostic testing of CPU, memory, storage, display, battery, and all connected components."
    },
    {
      icon: Award,
      title: "Tamper-Proof Certificates",
      description: "Cryptographically signed certificates that provide verifiable proof of device condition and data erasure."
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols protect your device information throughout the process."
    }
  ];

  const deviceTypes = [
    { icon: Monitor, name: "Desktop PCs", description: "Full tower and mini PCs" },
    { icon: Smartphone, name: "Smartphones", description: "iOS and Android devices" },
    { icon: HardDrive, name: "Laptops", description: "Business and consumer laptops" },
  ];

  const faqs = [
    {
      question: "Is my data completely secure during the process?",
      answer: "Yes. Revolve uses military-grade encryption and follows NIST SP 800-88 guidelines for secure data erasure. Once wiped, data cannot be recovered by any known method."
    },
    {
      question: "How long does the scan and wipe process take?",
      answer: "The complete process typically takes 15-45 minutes depending on device type and storage size. You'll see real-time progress throughout."
    },
    {
      question: "What happens if my device fails the diagnostic?",
      answer: "Failed components are clearly identified in the report. You'll receive recommendations for repair, recycling, or secure disposal based on the findings."
    },
    {
      question: "Can I use this for compliance audits?",
      answer: "Absolutely. Our certificates meet regulatory requirements for data destruction and can be used for SOX, HIPAA, GDPR, and other compliance frameworks."
    },
    {
      question: "What if I need to cancel during the process?",
      answer: "You can pause or cancel the scan before data wiping begins. Once secure erasure starts, it cannot be stopped for security compliance reasons."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-scan max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">About Revolve</h2>
            <p className="text-muted-foreground">Secure device diagnostics and data wiping platform</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Features */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Supported Devices */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Supported Devices</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {deviceTypes.map((device, index) => (
                <Card key={index} className="text-center shadow-card">
                  <CardContent className="p-6">
                    <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <device.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-semibold mb-1">{device.name}</h4>
                    <p className="text-sm text-muted-foreground">{device.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Security Certifications */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Security & Compliance</h3>
            <Card className="shadow-card bg-gradient-security border-accent/20">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 mb-2">
                      NIST SP 800-88
                    </Badge>
                    <p className="text-sm">Federal data sanitization standards</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-2">
                      ISO 27001
                    </Badge>
                    <p className="text-sm">Information security management</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 mb-2">
                      SOC 2 Type II
                    </Badge>
                    <p className="text-sm">Security, availability & processing integrity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground ml-6">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center py-6 border-t">
            <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Securely analyze and wipe your device in minutes with enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="scan" size="lg" onClick={onStartScan}>
                Start Device Scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;