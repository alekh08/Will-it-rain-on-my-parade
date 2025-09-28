import { useState } from "react";
import { Calendar, MapPin, Settings2, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ControlsPanelProps {
  onRunQuery?: (settings: QuerySettings) => void;
}

interface QuerySettings {
  date: string;
  eventType: string;
  precipitationThreshold: number;
  windThreshold: number;
  includeHistorical: boolean;
  includeForecast: boolean;
}

export function ControlsPanel({ onRunQuery }: ControlsPanelProps) {
  const [settings, setSettings] = useState<QuerySettings>({
    date: "2024-07-15",
    eventType: "outdoor",
    precipitationThreshold: 50,
    windThreshold: 25,
    includeHistorical: true,
    includeForecast: true,
  });

  const handleRunQuery = () => {
    onRunQuery?.(settings);
  };

  const updateSettings = (updates: Partial<QuerySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <Card className="glass-card border-0 p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="h-5 w-5" />
        <h3 className="font-semibold">Query Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4" />
            Event Date
          </label>
          <input
            type="date"
            value={settings.date}
            onChange={(e) => updateSettings({ date: e.target.value })}
            className="w-full px-3 py-2 bg-white/50 border border-white/20 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Event Type */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" />
            Event Type
          </label>
          <Select value={settings.eventType} onValueChange={(value) => updateSettings({ eventType: value })}>
            <SelectTrigger className="bg-white/50 border-white/20 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outdoor">Outdoor Event</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
              <SelectItem value="sports">Sports Event</SelectItem>
              <SelectItem value="picnic">Picnic</SelectItem>
              <SelectItem value="parade">Parade</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Precipitation Threshold */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Precipitation Threshold</label>
            <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
              {settings.precipitationThreshold}%
            </div>
          </div>
          <Slider
            value={[settings.precipitationThreshold]}
            onValueChange={(value) => updateSettings({ precipitationThreshold: value[0] })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Wind Threshold */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Wind Speed Threshold</label>
            <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
              {settings.windThreshold} mph
            </div>
          </div>
          <Slider
            value={[settings.windThreshold]}
            onValueChange={(value) => updateSettings({ windThreshold: value[0] })}
            min={0}
            max={50}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 mph</span>
            <span>25 mph</span>
            <span>50 mph</span>
          </div>
        </div>

        {/* Data Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Data Sources</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Include Historical Data</label>
              <p className="text-xs text-muted-foreground">Use past 30 years of weather data</p>
            </div>
            <Switch
              checked={settings.includeHistorical}
              onCheckedChange={(checked) => updateSettings({ includeHistorical: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Include Forecast</label>
              <p className="text-xs text-muted-foreground">Use 14-day weather forecast</p>
            </div>
            <Switch
              checked={settings.includeForecast}
              onCheckedChange={(checked) => updateSettings({ includeForecast: checked })}
            />
          </div>
        </div>

        {/* Run Query Button */}
        <Button 
          onClick={handleRunQuery}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Play className="h-4 w-4 mr-2" />
          Run Query
        </Button>
      </div>
    </Card>
  );
}