import { TrendingUp, Download, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ChartCardProps {
  title: string;
  description: string;
  peakProbability: number;
  averageProbability: number;
}

export function ChartCard({ 
  title, 
  description, 
  peakProbability, 
  averageProbability 
}: ChartCardProps) {
  // Generate probability distribution curve data
  const generateBellCurve = () => {
    const points = [];
    const days = 30;
    const center = days / 2;
    const width = days / 6;
    
    for (let i = 0; i <= days; i++) {
      const x = (i / days) * 100;
      const normalized = (i - center) / width;
      const y = Math.exp(-0.5 * normalized * normalized);
      const probability = (y * peakProbability) + (averageProbability * 0.3);
      points.push({ x, y: 100 - (probability / 100) * 80 });
    }
    return points;
  };

  const curvePoints = generateBellCurve();
  const pathData = curvePoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  const fillPath = `${pathData} L 100 100 L 0 100 Z`;

  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{title}</h3>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{peakProbability}%</div>
          <div className="text-xs text-muted-foreground">Peak Probability</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{averageProbability}%</div>
          <div className="text-xs text-muted-foreground">30-Day Average</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <div className="h-48 w-full mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Grid lines */}
            <defs>
              <pattern id="chartGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chartGrid)" />
            
            {/* Area fill */}
            <path
              d={fillPath}
              fill="url(#chartGradient)"
              opacity="0.3"
              className="animate-fade-in"
              style={{ animationDelay: '600ms' }}
            />
            
            {/* Curve line */}
            <path
              d={pathData}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500"
              style={{
                strokeDasharray: '500',
                strokeDashoffset: '500',
                animation: 'drawLine 2s ease-out 800ms forwards'
              }}
            />
            
            {/* Peak marker */}
            <circle
              cx="50"
              cy={100 - (peakProbability / 100) * 80}
              r="3"
              fill="currentColor"
              className="text-blue-500 animate-bounce-in"
              style={{ animationDelay: '1.5s' }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>

        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 -translate-x-6 text-xs text-muted-foreground">
          Probability %
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-muted-foreground">Historical Data</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending Up
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: 2 hours ago
        </div>
      </div>
    </div>
  );
}

// Add the draw line animation to our CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;
document.head.appendChild(style);