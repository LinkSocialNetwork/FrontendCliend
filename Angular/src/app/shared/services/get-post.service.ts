import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {

  constructor(private myHttpCli:HttpClient) { }

  getAllPosts():Observable<Post[]>{
    let url:string ="http://localhost:9080/api/postservice/post";
    return this.myHttpCli.get<Post[]>(url,{withCredentials:true});
  }
  getPostById(id:number):Observable<Post>{
    let url:string =`http://localhost:9080/api/postservice/post/${id}`;
    return this.myHttpCli.get<Post>(url,{withCredentials:true});
  }

  getPostsCreatedByUser(id:number, page:number):Observable<Post[]>{
    let url:string =`http://localhost:9080/api/postservice/post/user/${id}/page/${page}/temp`;
    return this.myHttpCli.get<Post[]>(url,{withCredentials:true});
  }

  getUsersFollowingPosts(userId: number,page:number):Observable<Post[]>{
    let url:string =`http://localhost:9080/api/postservice/post/user/${userId}/page/${page}`;
    return this.myHttpCli.get<Post[]>(url,{withCredentials:true});
  }
}
