import Rack from './Rack';

/**
 * User model interface
 */
export default interface User {
  /** User id (uuidv4) */
  id: string;
  /** Username */
  username: string;
  /** User email */
  email: string;
  /** User avatar photo URL */
  avatar?: string;

  /** racks */
  racks?: Rack[];
}
