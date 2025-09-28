import { useState } from "react";
import { Download, FileText, Database, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ExportButtonProps {
  onExport?: (format: 'csv' | 'json' | 'pdf') => void;
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      onExport?.(format);
      setIsExporting(false);
    }, 2000);
  };

  const exportOptions = [
    {
      format: 'csv' as const,
      icon: FileText,
      title: 'CSV Export',
      description: 'Comma-separated values for spreadsheet applications',
      size: '~2.5 KB'
    },
    {
      format: 'json' as const,
      icon: Database,
      title: 'JSON Export',
      description: 'Structured data format for developers and APIs',
      size: '~3.2 KB'
    },
    {
      format: 'pdf' as const,
      icon: Share2,
      title: 'PDF Report',
      description: 'Comprehensive report with charts and analysis',
      size: '~850 KB'
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Results'}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Weather Data
          </DialogTitle>
          <DialogDescription>
            Choose your preferred format to download the weather analysis results.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-6">
          {exportOptions.map(({ format, icon: Icon, title, description, size }) => (
            <Button
              key={format}
              variant="ghost"
              className="w-full h-auto p-4 justify-start hover:bg-white/10 text-left"
              onClick={() => handleExport(format)}
              disabled={isExporting}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="p-2 rounded-lg bg-white/20 mt-0.5">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{title}</span>
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-left leading-tight">
                    {description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Data includes:</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• 30-year historical weather patterns</li>
            <li>• Probability calculations for selected date</li>
            <li>• Precipitation and wind speed thresholds</li>
            <li>• Location coordinates and metadata</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}