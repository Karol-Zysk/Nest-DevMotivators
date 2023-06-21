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

export interface Comment {
  _id: string;
  comment: string;
  user: {
    _id: string;
    login: string;
    userPhoto: string;
    technology: string;
    seniority: string;
  };
  motivator: string;
  createdAt: string;
}
