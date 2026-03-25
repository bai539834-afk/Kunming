export type POICategory = 'nature' | 'history' | 'culture' | 'food';

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  coords: [number, number];
  description: string;
  image: string;
  stamp: string; // The "stamp" icon or name
}

export interface UserState {
  visitedIds: string[];
  userName: string;
  daysInKunming: number;
}
