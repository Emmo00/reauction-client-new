/**
 * Waitlist entry type for MongoDB
 */
export interface Waitlist {
  _id?: string;
  fid: string;
  username: string;
  allowed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
