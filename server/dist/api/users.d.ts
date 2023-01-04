import { User } from "../db/users";
export declare type UserPostRequest = Omit<User, "id">;
export declare type UserPatchRequest = User;
export declare function userPostBody(body: any): body is UserPostRequest;
export declare function userPatchBody(body: any): body is UserPatchRequest;
