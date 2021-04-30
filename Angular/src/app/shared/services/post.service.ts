import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/Post';
import { User } from '../model/User';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private myHttpCli:HttpClient,private cookieService: GetCookieService) { }

  insertNewPost(post:Post):Observable<string>{
    //temporary hardcode USER object for testing
    let currentUser:User ={
      userID: 1,
      userName: 'dang1',
      password: '',
      email: '',
      dob: '',
      profile_img_url: '',
      bio: '',
      posts: null,
      likes: null,
      firstName:'',
      lastName:''};
  
    let url:string="http://localhost:9080/api/postservice/post";
    console.log("New post", post);
    // post.user = currentUser;
    return this.myHttpCli.post<string>(url,post,{withCredentials:true});
  }
  updatePost(post:Post):Observable<string>{
    let url:string = "http://localhost:9080/api/postservice/post";
    return this.myHttpCli.put<string>(url,post,{withCredentials:true});
  }
  deletePost(id:number):Observable<ArrayBuffer>{
    let url:string = `http://localhost:9080/api/postservice/post/${id}`;
    return this.myHttpCli.delete<ArrayBuffer>(url);
  }
}
