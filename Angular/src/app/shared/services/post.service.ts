import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private myHttpCli:HttpClient) { }

  insertNewPost(post:Post):Observable<string>{
    let url:string="http://localhost:9080/api/postervice/post";
    return this.myHttpCli.post<string>(url,post,{withCredentials:true});
  }
  updatePost(post:Post):Observable<string>{
    let url:string = "http://localhost:9080/api/postervice/post";
    return this.myHttpCli.put<string>(url,post,{withCredentials:true});
  }
  deletePost(id:number):Observable<ArrayBuffer>{
    let url:string = `http://localhost:9080/api/postervice/post/${id}`;
    return this.myHttpCli.delete<ArrayBuffer>(url);
  }
}