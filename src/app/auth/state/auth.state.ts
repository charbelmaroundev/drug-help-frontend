import { Access_Token } from 'src/app/models/user.model';

export interface AuthState {
  access_token: Access_Token | null;
}

export const initialeState: AuthState = {
  access_token: null,
};
