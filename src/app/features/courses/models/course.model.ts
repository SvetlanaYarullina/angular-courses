export interface Course {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
  authors?: Author[];
}

export interface Author {
  id: number | string;
  name: string;
  lastName?: string;
}
