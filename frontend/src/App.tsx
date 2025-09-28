import { useState, useEffect } from "react";
import { Navbar } from "./components/navbar";
import { MapPicker } from "./components/map-picker";
import { WeatherCard } from "./components/weather-card";
import { ChartCard } from "./components/chart-card";
import { ControlsPanel } from "./components/controls-panel";
import { ExportButton } from "./components/export-button";
import { Button } from "./components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface QuerySettings {
  date: string;
  eventType: string;
  precipitationThreshold: number;
  windThreshold: number;
  includeHistorical: boolean;
  includeForecast: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [querySettings, setQuerySettings] = useState<QuerySettings | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleRunQuery = (settings: QuerySettings) => {
    setQuerySettings(settings);
    setShowResults(true);
  };

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    console.log(`Exporting data as ${format}`);
    // In a real app, this would trigger the actual export
  };

  // Mock weather data for demonstration
  const weatherData = [
    {
      type: 'rain' as const,
      probability: 73,
      title: 'Rain Probability',
      description: 'Chance of precipitation',
      trend: 'up' as const,
    },
    {
      type: 'storm' as const,
      probability: 25,
      title: 'Storm Risk',
      description: 'Severe weather likelihood',
      trend: 'down' as const,
    },
    {
      type: 'wind' as const,
      probability: 45,
      title: 'High Winds',
      description: 'Above threshold wind speed',
      trend: 'stable' as const,
    },
    {
      type: 'cloudy' as const,
      probability: 82,
      title: 'Cloud Cover',
      description: 'Overcast conditions',
      trend: 'up' as const,
    }
  ];

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1701051232710-3d45e949cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTg4MjU4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`
          }}
        />
        
        {/* Navigation */}
        <div className="relative z-10 p-6">
          <Navbar isMobile={isMobile} />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            {/* Main Heading */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-8 w-8 text-blue-500" />
                <span className="text-sm font-medium text-blue-500 uppercase tracking-wide">
                  Weather Intelligence
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Will It Rain On My Parade?
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Historical probabilities for weather on the date and place you choose. 
                Make informed decisions for your outdoor events with 30 years of weather data.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {[
                {
                  icon: "📊",
                  title: "Historical Analysis",
                  description: "30 years of weather data analyzed for your specific date and location"
                },
                {
                  icon: "🎯",
                  title: "Precise Predictions",
                  description: "Custom thresholds for precipitation, wind speed, and other factors"
                },
                {
                  icon: "📱",
                  title: "Interactive Dashboard",
                  description: "Beautiful visualizations and exportable reports for your planning"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 text-lg px-8 py-6 animate-bounce-in"
              style={{ animationDelay: '600ms' }}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Subtle Call to Action */}
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '800ms' }}>
              No signup required • Free to use • Export your results
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      {/* Navigation */}
      <div className="sticky top-0 z-50 p-4 md:p-6">
        <Navbar isMobile={isMobile} />
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 pb-6">
        {isMobile ? (
          // Mobile Layout - Stacked
          <div className="space-y-6">
            {/* Controls */}
            <ControlsPanel onRunQuery={handleRunQuery} />
            
            {/* Map */}
            <div className="h-64">
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>

            {/* Results */}
            {showResults && (
              <>
                <div className="grid gap-4">
                  {weatherData.map((weather, index) => (
                    <WeatherCard
                      key={index}
                      {...weather}
                      delay={index * 100}
                    />
                  ))}
                </div>
                
                <ChartCard
                  title="Probability Distribution"
                  description="Historical weather patterns for your selected date"
                  peakProbability={73}
                  averageProbability={45}
                />

                <div className="sticky bottom-4 z-40">
                  <ExportButton onExport={handleExport} />
                </div>
              </>
            )}
          </div>
        ) : (
          // Desktop Layout - Side by side
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            {/* Left Sidebar - Controls */}
            <div className="col-span-3 space-y-6 overflow-y-auto">
              <ControlsPanel onRunQuery={handleRunQuery} />
              
              {selectedLocation && (
                <div className="glass-card p-4 animate-slide-up">
                  <h4 className="font-semibold mb-2">Selected Location</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}

              {showResults && (
                <div className="sticky bottom-0">
                  <ExportButton onExport={handleExport} />
                </div>
              )}
            </div>

            {/* Center - Map */}
            <div className="col-span-5">
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>

            {/* Right Sidebar - Results */}
            <div className="col-span-4 space-y-6 overflow-y-auto">
              {showResults ? (
                <>
                  <div className="space-y-4">
                    {weatherData.map((weather, index) => (
                      <WeatherCard
                        key={index}
                        {...weather}
                        delay={index * 100}
                      />
                    ))}
                  </div>
                  
                  <ChartCard
                    title="Probability Distribution"
                    description="Historical weather patterns for your selected date"
                    peakProbability={73}
                    averageProbability={45}
                  />
                </>
              ) : (
                <div className="glass-card p-8 text-center h-full flex items-center justify-center">
                  <div className="animate-fade-in">
                    <div className="text-6xl mb-4">🌤️</div>
                    <h3 className="mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground text-sm">
                      Select a location on the map and configure your settings to begin weather analysis.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}