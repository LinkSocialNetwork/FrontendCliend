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
    let url:string="http://localhost:9080/api/postservice/post";
    let authtoken=this.cookieService.getCookie("token");
    return this.myHttpCli.post<string>(url,post,{headers: {
      token: authtoken
    },withCredentials:true});
  }
  updatePost(post:Post):Observable<string>{
    let url:string = "http://localhost:9080/api/postservice/post";
    let authtoken=this.cookieService.getCookie("token");
    return this.myHttpCli.put<string>(url,post,{headers: {
      token: authtoken
    },withCredentials:true});
  }
  deletePost(id:number):Observable<ArrayBuffer>{
    let url:string = `http://localhost:9080/api/postservice/post/${id}`;
    let authtoken=this.cookieService.getCookie("token");
    return this.myHttpCli.delete<ArrayBuffer>(url,{headers: {
      token: authtoken
    }});
  }
}
