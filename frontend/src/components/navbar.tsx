import { Search, Settings, User, Menu, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NavbarProps {
  isMobile?: boolean;
  onMenuToggle?: () => void;
}

export function Navbar({ isMobile = false, onMenuToggle }: NavbarProps) {
  return (
    <nav className={`glass-card border-0 ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="p-2"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">RainCheck</span>
              {!isMobile && (
                <span className="text-sm text-muted-foreground">Weather Predictor</span>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop Only */}
        {!isMobile && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-10 bg-white/50 border-white/20 backdrop-blur-sm"
              />
            </div>
          </div>
        )}

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="p-2" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2" aria-label="Profile">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}