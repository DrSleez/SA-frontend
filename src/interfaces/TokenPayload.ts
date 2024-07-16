export interface TokenPayload {
  resource_access: {
    "frontend-client": {
      roles: string[];
    };
    [key: string]: {
      roles: string[];
    };
  };
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}
