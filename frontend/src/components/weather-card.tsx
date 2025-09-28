import { Cloud, CloudRain, Sun, Snowflake, Zap, Wind, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface WeatherCardProps {
  type: 'rain' | 'snow' | 'storm' | 'clear' | 'cloudy' | 'wind';
  probability: number;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  sparklineData?: number[];
  delay?: number;
}

const weatherIcons = {
  rain: CloudRain,
  snow: Snowflake,
  storm: Zap,
  clear: Sun,
  cloudy: Cloud,
  wind: Wind,
};

const weatherColors = {
  rain: 'text-blue-500',
  snow: 'text-cyan-400',
  storm: 'text-purple-500',
  clear: 'text-yellow-500',
  cloudy: 'text-gray-500',
  wind: 'text-emerald-500',
};

export function WeatherCard({ 
  type, 
  probability, 
  title, 
  description, 
  trend,
  sparklineData = [45, 52, 48, 61, 55, 67, probability],
  delay = 0
}: WeatherCardProps) {
  const Icon = weatherIcons[type];
  const iconColor = weatherColors[type];

  // Generate SVG path for sparkline
  const sparklinePath = sparklineData.map((value, index) => {
    const x = (index / (sparklineData.length - 1)) * 100;
    const y = 100 - (value / 100) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'text-red-500';
    if (prob >= 50) return 'text-yellow-500';
    if (prob >= 30) return 'text-blue-500';
    return 'text-green-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingUp className="h-3 w-3 rotate-180" />;
    return <div className="h-3 w-3 rounded-full bg-current opacity-50" />;
  };

  return (
    <div 
      className="glass-card p-6 hover-lift animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          {getTrendIcon()}
          <span className="text-xs">{trend}</span>
        </Badge>
      </div>

      {/* Probability Display */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-3xl font-bold ${getProbabilityColor(probability)}`}>
            {probability}%
          </span>
          <span className="text-sm text-muted-foreground">probability</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
              probability >= 70 ? 'bg-red-500' :
              probability >= 50 ? 'bg-yellow-500' :
              probability >= 30 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ 
              width: `${probability}%`,
              animationDelay: `${delay + 200}ms`
            }}
          />
        </div>
      </div>

      {/* Sparkline Chart */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>7-day trend</span>
          <span>{Math.max(...sparklineData)}% peak</span>
        </div>
        <div className="h-12 w-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={sparklinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={iconColor}
              opacity="0.7"
            />
            {/* Data points */}
            {sparklineData.map((value, index) => (
              <circle
                key={index}
                cx={(index / (sparklineData.length - 1)) * 100}
                cy={100 - (value / 100) * 100}
                r="1.5"
                fill="currentColor"
                className={iconColor}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full text-sm hover:bg-white/10"
        aria-label={`View detailed ${title.toLowerCase()} information`}
      >
        View Details
      </Button>
    </div>
  );
}