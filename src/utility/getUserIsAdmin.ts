import { AuthenticatedUser } from "../interfaces/AuthenticatedUser";

export default function getUserIsAdmin(user: AuthenticatedUser | null) {
  if (user === null) {
    return false;
  }
  return user.roles.includes("client_content");
}
