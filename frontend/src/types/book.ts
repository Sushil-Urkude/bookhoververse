export interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export interface Book {
  id: string;
  title: string;
  author: Author;
  coverImage: string;
  spineColor: string;
  genre: string;
  review?: string;
  rating?: number;
  publishedDate?: string;
}

export interface BookFormData {
  title: string;
  authorName: string;
  authorBio: string;
  genre: string;
  review: string;
  rating: string;
  publishedDate: string;
  coverImage: File | null;
  authorImage: File | null;
  spineColor: string;
} 