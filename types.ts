export interface PlanetData {
  id: string;
  name: string;
  color: string;
  size: number; // Relative radius
  distance: number; // Distance from sun
  speed: number; // Orbit speed
  description: string;
  hasRing?: boolean;
  ringColor?: string;
  ringSize?: [number, number]; // inner, outer radius
  diameter: string; // e.g., "12,742 km"
  rotationPeriod: string; // e.g., "24 hours"
  orbitalPeriod: string; // e.g., "365 days"
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type Vector3Tuple = [number, number, number];