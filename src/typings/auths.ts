export interface UserAuthorisation {
  createdAt: string;
  email: string;
  name: string;
  persPromo: string;
  role: string;
  token: string;
  bonuses: number;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface userRegistration {
  createdAt: string;
  email: string;
  name: string;
  persPromo: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
  bonuses: number;
  message: string;
  sucsess: boolean;
  status: number;
}
