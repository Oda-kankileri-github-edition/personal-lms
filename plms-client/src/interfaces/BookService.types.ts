import { Book, BookStatus } from './Book';
import Response from './Response';

/**
 * Get books request
 * @interface GetBooksRequest
 */
export interface GetBooksRequest {
  /** query */
  queryParamaters?: {
    /** Search query */
    q?: string;
    /** Search status */
    status?: BookStatus;
    /** Search by tag */
    tag?: string;
  };
}

/**
 * Response for get books request
 * @interface GetBooksResponse
 */
export interface GetBooksResponse extends Response {
  /** List of books */
  books: Book[];
}
