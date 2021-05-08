import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private myHttpCli:HttpClient,private cookieService: GetCookieService) { }

  insertNewPost(post:Post):Observable<string>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string="http://localhost:9080/api/postservice/protected/post";
    return this.myHttpCli.post<string>(url,post,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }
  updatePost(post:Post):Observable<string>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string = "http://localhost:9080/api/postservice/protected/post";
    return this.myHttpCli.put<string>(url,post,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }
  deletePost(id:number):Observable<ArrayBuffer>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string = `http://localhost:9080/api/postservice/protected/post/${id}`;
    return this.myHttpCli.delete<ArrayBuffer>(url, {
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }
}
