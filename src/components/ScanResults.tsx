import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowLeft,
  Shield,
  Award,
  QrCode,
  FileText,
  Zap
} from "lucide-react";

interface ScanResultsProps {
  results: ScanResults;
  onBack: () => void;
  onStartNew: () => void;
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

const ScanResults = ({ results, onBack, onStartNew }: ScanResultsProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Excellent": return "text-success";
      case "Good": return "text-primary";
      case "Fair": return "text-warning";
      case "Poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "fail": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Resale": return "bg-success/10 text-success border-success/20";
      case "Refurbish": return "bg-primary/10 text-primary border-primary/20";
      case "Recycle": return "bg-warning/10 text-warning border-warning/20";
      case "Destroy": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const downloadReport = (format: "pdf" | "json") => {
    // Simulate download
    const filename = `revolve-report-${results.certificateId.toLowerCase()}.${format}`;
    console.log(`Downloading ${filename}...`);
    // In a real app, this would trigger the actual download
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover-lift">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scan
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Device Scan Results</h1>
              <p className="text-muted-foreground font-medium">Comprehensive analysis complete</p>
            </div>
          </div>
          <Button variant="scan" onClick={onStartNew} className="hover-glow">
            <Zap className="h-4 w-4 mr-2" />
            Scan Another Device
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overall Score & Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 text-center hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Overall Device Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="w-40 h-40 mx-auto">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - results.overallScore / 100)}`}
                        className={getGradeColor(results.grade)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getGradeColor(results.grade)}`}>
                          {results.overallScore}
                        </div>
                        <div className="text-sm text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Badge variant="outline" className={`text-xl px-6 py-3 ${getGradeColor(results.grade)} border-current`}>
                    {results.grade}
                  </Badge>
                </div>

                <div>
                  <Badge className={getRecommendationColor(results.recommendation) + " px-4 py-2"}>
                    Recommendation: {results.recommendation}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Certificate */}
            <Card className="shadow-lg border-accent/20 bg-accent/5 hover-lift">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-accent text-lg">
                  <div className="p-2 bg-accent/10 rounded-lg mr-3">
                    <Award className="h-6 w-6" />
                  </div>
                  Compliance Certificate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                    <QrCode className="h-20 w-20 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-mono text-muted-foreground font-semibold">
                      {results.certificateId}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center">
                    <Shield className="h-4 w-4 mr-3" />
                    NIST SP 800-88 Rev. 1 Compliant
                  </p>
                  <p className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3" />
                    Cryptographic Hash Verified
                  </p>
                  <p className="flex items-center">
                    <Award className="h-4 w-4 mr-3" />
                    EPR Audit Ready
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Device Journey Timeline */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Device Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">Device registered & identified</span>
                    <span className="text-xs text-muted-foreground ml-auto">2024-01-15 14:32</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">Data sanitization completed</span>
                    <span className="text-xs text-muted-foreground ml-auto">2024-01-15 14:35</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">Diagnostic analysis finished</span>
                    <span className="text-xs text-muted-foreground ml-auto">2024-01-15 14:38</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">Certificate generated</span>
                    <span className="text-xs text-muted-foreground ml-auto">2024-01-15 14:39</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Component Scores */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Component Analysis</CardTitle>
                <p className="text-muted-foreground">
                  Detailed breakdown of device components and their condition
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.components.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-gradient-secondary rounded-xl border border-border/50 hover-lift">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/50">
                          {getStatusIcon(component.status)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{component.component}</h4>
                          <p className="text-sm text-muted-foreground">{component.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right min-w-0">
                          <div className="font-bold text-lg">{component.score}/100</div>
                          <Progress value={component.score} className="w-28 h-3 mt-2 shadow-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Download Reports */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl">Download Reports</CardTitle>
                <p className="text-muted-foreground">
                  Get detailed reports in multiple formats for your records
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button 
                    variant="outline" 
                    className="h-auto p-6 justify-start hover-lift border-2"
                    onClick={() => downloadReport("pdf")}
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-10 w-10 text-destructive" />
                      <div className="text-left">
                        <div className="font-semibold text-base">PDF Report</div>
                        <div className="text-sm text-muted-foreground">
                          Human-readable comprehensive report
                        </div>
                      </div>
                    </div>
                    <Download className="h-5 w-5 ml-auto" />
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto p-6 justify-start hover-lift border-2"
                    onClick={() => downloadReport("json")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-mono text-primary font-bold">JSON</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-base">Machine Data</div>
                        <div className="text-sm text-muted-foreground">
                          Structured data for integration
                        </div>
                      </div>
                    </div>
                    <Download className="h-5 w-5 ml-auto" />
                  </Button>
                </div>

                <div className="mt-6 p-6 bg-accent/5 rounded-xl border border-accent/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong>Note:</strong> All reports include the tamper-proof certificate and 
                    compliance verification. Keep these documents for audit trails and resale purposes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;