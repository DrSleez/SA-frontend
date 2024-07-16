export interface AuthenticatedUser {
  access_token?: string;
  name: string;
  username: string;
  given_name: string;
  family_name: string;
  email: string;
  roles: string[];
}
