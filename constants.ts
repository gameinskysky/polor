import { PlanetData } from './types';

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#A5A5A5',
    size: 0.38,
    distance: 6,
    speed: 1.5,
    description: "The smallest planet in the Solar System and the closest to the Sun.",
    diameter: "4,879 km",
    rotationPeriod: "58.6 days",
    orbitalPeriod: "88 days"
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#E3BB76',
    size: 0.95,
    distance: 9,
    speed: 1.2,
    description: "Second planet from the Sun. It has a thick atmosphere trapping heat.",
    diameter: "12,104 km",
    rotationPeriod: "243 days",
    orbitalPeriod: "225 days"
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#22A6B3',
    size: 1,
    distance: 13,
    speed: 1.0,
    description: "Our home planet, the only known celestial body to harbor life.",
    diameter: "12,742 km",
    rotationPeriod: "23.9 hours",
    orbitalPeriod: "365.2 days"
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#EB4D4B',
    size: 0.53,
    distance: 17,
    speed: 0.8,
    description: "The Red Planet, known for its dusty red soil and giant volcanoes.",
    diameter: "6,779 km",
    rotationPeriod: "24.6 hours",
    orbitalPeriod: "687 days"
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#F9CA24',
    size: 3.5,
    distance: 25,
    speed: 0.4,
    description: "The largest planet in the Solar System, a gas giant with a Great Red Spot.",
    diameter: "139,820 km",
    rotationPeriod: "9.9 hours",
    orbitalPeriod: "11.86 years"
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#F0DF90',
    size: 3.0,
    distance: 34,
    speed: 0.3,
    description: "Famous for its prominent ring system composed of ice particles, rocky debris and dust.",
    hasRing: true,
    ringColor: '#C4A484',
    ringSize: [4, 6],
    diameter: "116,460 km",
    rotationPeriod: "10.7 hours",
    orbitalPeriod: "29.45 years"
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#7ED6DF',
    size: 2.0,
    distance: 42,
    speed: 0.2,
    description: "It has a unique tilt that makes it spin on its side.",
    diameter: "50,724 km",
    rotationPeriod: "17.2 hours",
    orbitalPeriod: "84 years"
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#4834D4',
    size: 1.9,
    distance: 50,
    speed: 0.1,
    description: "The most distant major planet, dark, cold, and whipped by supersonic winds.",
    diameter: "49,244 km",
    rotationPeriod: "16.1 hours",
    orbitalPeriod: "164.8 years"
  }
];