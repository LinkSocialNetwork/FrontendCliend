
import { Like } from "./LIke";
import { Post } from "./Post";


export interface User{
    'userID': number;
    'userName':string;
    'password':string;
    'email':string;
    'dob': string;
    'profile_img_url':string;
    'bio':string;
    'firstName':string;
    'lastName':string;
    'posts':Post[];
    'likes':Like[];
    'following': User[];
}