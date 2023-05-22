export class Access_Token {
  constructor(public access_token: string) {}
}

export class User {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    status: string
  ) {}
}

export interface IUser {
  id: number;
  firstName: string;
  picture: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}
export enum EUserStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  DELETED = 'DELETED',
  PROVIDED = 'PROVIDED',
  BANNED = 'BANNED',
}
