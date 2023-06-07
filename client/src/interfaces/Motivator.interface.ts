export interface Motivator {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  like: string[];
  dislike: string[];
  place: string;
  keyWords: string[];
  author: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  safeIn?: string;
  movedToMain: string;
  id: string;
}
