import { useState } from "react";
import { MapPin, Crosshair, Layers } from "lucide-react";
import { Button } from "./ui/button";

interface MapPickerProps {
  onLocationSelect?: (location: { lat: number; lng: number; name: string }) => void;
}

export function MapPicker({ onLocationSelect }: MapPickerProps) {
  const [pinLocation, setPinLocation] = useState<{ x: number; y: number } | null>(null);
  const [isDropping, setIsDropping] = useState(false);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    setIsDropping(true);
    setPinLocation({ x, y });
    
    // Simulate location data
    const mockLocation = {
      lat: 40.7128 + (Math.random() - 0.5) * 10,
      lng: -74.0060 + (Math.random() - 0.5) * 10,
      name: `Location ${Math.floor(Math.random() * 1000)}`
    };
    
    setTimeout(() => {
      setIsDropping(false);
      onLocationSelect?.(mockLocation);
    }, 600);
  };

  return (
    <div className="glass-card h-full min-h-[400px] overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button size="sm" variant="secondary" className="p-2 glass-card border-0">
          <Crosshair className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary" className="p-2 glass-card border-0">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Area */}
      <div 
        className="relative w-full h-full cursor-crosshair bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900"
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
        aria-label="Click to select location on map"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            // Handle keyboard interaction
            const rect = e.currentTarget.getBoundingClientRect();
            const x = 50; // Center of map
            const y = 50;
            setPinLocation({ x, y });
            setIsDropping(true);
            setTimeout(() => setIsDropping(false), 600);
          }
        }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="text-blue-300">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Mock Geography */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-16 w-32 h-24 bg-green-200 dark:bg-green-800 rounded-full opacity-60"></div>
          <div className="absolute bottom-32 right-20 w-24 h-20 bg-blue-300 dark:bg-blue-700 rounded-lg opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-amber-200 dark:bg-amber-800 rounded-full opacity-50"></div>
        </div>

        {/* Location Pin */}
        {pinLocation && (
          <div 
            className={`absolute transform -translate-x-1/2 -translate-y-full ${
              isDropping ? 'animate-pin-drop' : ''
            }`}
            style={{ 
              left: `${pinLocation.x}%`, 
              top: `${pinLocation.y}%` 
            }}
          >
            <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" fill="currentColor" />
          </div>
        )}

        {/* Instructions */}
        {!pinLocation && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass-card p-6 text-center animate-fade-in">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-blue-500" />
              <h3 className="mb-2">Select Your Location</h3>
              <p className="text-sm text-muted-foreground">
                Click anywhere on the map to drop a pin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}