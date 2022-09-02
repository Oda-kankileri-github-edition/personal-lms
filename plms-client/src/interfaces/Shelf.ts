import { Book } from './Book';

/**
 * Shelf model interface
 */
export default interface Shelf {
  /** shelf id in uuid v4 format */
  id: string;
  /** shelf name */
  name: string;
  /** shelf description */
  description: string;
  /** shelf availability for adding a new book */
  isAvailable: boolean;
  /** rack id */
  rackId: string;

  /** books */
  books?: Book[];
}
