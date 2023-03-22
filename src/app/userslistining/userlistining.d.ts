export interface Users {
  users: User[];
}

export interface User {
  id:string;
  autorizado: boolean;
  created: string;
  email: string;
  gender: string;
  name: string;
  role: string;
  username: string;
}