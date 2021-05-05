import { User } from "./User";



export interface Follow{
    followID: number;
    follower: User;
    followee: User;
}