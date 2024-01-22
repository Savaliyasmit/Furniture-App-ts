export interface IUser {
  _id?: string;
  profileImage?: string;
  email: string;
  password: string;
  gender: "male" | "female";
  role: "user" | "admin";
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
