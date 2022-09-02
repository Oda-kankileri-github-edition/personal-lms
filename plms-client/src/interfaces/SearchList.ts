export interface SearchListItem {
  id: string;
  title: string;
  authors: string | string[];
  coverURL?: string | undefined;
}

export interface SearchList {
  items: SearchListItem[] | [];
}
