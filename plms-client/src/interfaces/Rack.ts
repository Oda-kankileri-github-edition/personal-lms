import Shelf from './Shelf';

/**
 * Rack model interface
 */
export default interface Rack {
  /** rack id in uuid v4 format */
  id: string;
  /** rack name */
  name: string;
  /** rack description */
  description?: string;
  /** whether a physical rack with printed book or a rack with e-books */
  isVirtual: boolean;
  /** user id */
  userId: string;

  /** shelves */
  shelves?: Shelf[];
}
