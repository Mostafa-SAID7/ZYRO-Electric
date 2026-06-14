export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  buttonText: string;
  buttonColor: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}
