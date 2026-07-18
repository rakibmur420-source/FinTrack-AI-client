export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface Expense {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  amount: number;
  date: string;
  category: string;
  aiTags: string[];
  imageURL?: string;
  owner: string | User;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
