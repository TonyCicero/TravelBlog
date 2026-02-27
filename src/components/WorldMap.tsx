import { MapPin } from "lucide-react";


interface WorldMapProps {
  onLocationClick?: (postId: string) => void;
}

export function WorldMap({ onLocationClick }: WorldMapProps) {
  //const locations = getVisitedLocations();

  // Convert lat/lng to SVG coordinates (simplified projection)
  const latLngToXY = (lat: number, lng: number) => {
    // Simple equirectangular projection
    const x = ((lng + 180) * 800) / 360;
    const y = ((90 - lat) * 400) / 180;
    return { x, y };
  };

  return ('');
}
