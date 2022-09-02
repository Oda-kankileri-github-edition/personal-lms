/**
 * Book model interface
 */
export interface Book {
  /** Book id in uuidv4 format */
  id: string;
  /** Book title */
  title: string;
  /** Book author(s) */
  authors: string | string[];
  /** Book description */
  description?: string;
  /** Book cover image url */
  coverImage?: string;
  /** Book published date */
  publishedDate?: string;
  /** publisher */
  publisher?: string;
  /** book isbn */
  isbn?: string;
  /** book language */
  language?: string;
  /** book url */
  url?: string;
  /** Book page count */
  pageCount?: number;
  /** Book tags */
  tags?: string | string[];
  /** Book rating by user */
  rating?: number;
  /** status */
  status?: BookStatus;
  /** read page */
  readPage?: number;
  /** user notes */
  notes?: string;
  /** shelf id in uuidv4 format */
  shelfId?: string;
}

/**
 * Book status enum
 */
export enum BookStatus {
  /** Finished the book */
  READ,
  /** Currently reading the book */
  READING,
  /** Want to read the book */
  TO_READ,
  /** Not read the book */
  NOT_READ,
  /** Book is not in the library  */
  NOT_AVAILABLE,
}
