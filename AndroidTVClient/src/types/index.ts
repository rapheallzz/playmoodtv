export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  role: string;
  like: string[];
  watchlist: string[];
}
