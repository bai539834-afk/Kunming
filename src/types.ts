export type POICategory = 'nature' | 'history' | 'culture' | 'food';

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  coords: [number, number];
  description: string;
  history?: string;
  gallery?: string[];
  reviews?: Review[];
  image: string;
  stamp: string;
}

export interface UserState {
  visitedIds: string[];
  userName: string;
  daysInKunming: number;
}
