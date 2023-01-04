import { User } from "../db/users";

export type UserPostRequest = Omit<User, "id">;
export type UserPatchRequest = User;

export function userPostBody(body: any): body is UserPostRequest {
  return body.firstName && body.lastName && body.email && body.managerEmail;
}

export function userPatchBody(body: any): body is UserPatchRequest {
  return (
    body.firstName &&
    body.lastName &&
    body.email &&
    body.managerEmail &&
    body.id
  );
}
