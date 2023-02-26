export interface Post {
  _id: string;
  text: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
export interface Profile {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  name: string;
  email: string;
  password: string;
}
export interface AuthenticatedUser {
  name: string;
  email: string;
  id: string;
  token: string;
}