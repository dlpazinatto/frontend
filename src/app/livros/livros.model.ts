export interface Livro {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
  }

export interface LivrosResponse {
  books: Livro[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchParam {
  searchQuery: string;
  page: number;
  limit: number;
}