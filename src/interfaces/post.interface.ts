import { IUser } from "./user.interface";

export interface IPost  {
    id: string;
    content: string;
    user: IUser;
    likeCount: number;
    subPostCount: number;
    data: Date;
  };