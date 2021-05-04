import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from '../model/Follow';
import { ResponseMessage } from '../model/ResponseMessage';
import { User } from '../model/User';
import { GetCookieService } from './get-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private myHttpCli:HttpClient, private cookieService: GetCookieService) { }

  insertNewUser(user:User): Observable<ResponseMessage> {
    let url:string="http://localhost:9080/api/userservice/user";
    return this.myHttpCli.post<ResponseMessage>(url,user,{withCredentials:true});
  }

  updateUser(user:User): Observable<boolean>{
    let authtoken = this.cookieService.getCookie("token")
    let url: string = "http://localhost:9080/api/userservice/user";
    console.log(" inside the user update >>> "+user);
    return this.myHttpCli.put<boolean>(url,user,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });

  }

  deleteUser(id:number): void{
    let url: string = `http://localhost:9080/api/userservice/user/${id}`;
    //TODO: change in Java from deletemapping to postmapping
    this.myHttpCli.delete<HttpResponse<ArrayBuffer>>(url);
  }

  checkOldPass(user:User): Observable<boolean>{
    let url: string = "http://localhost:9080/api/userservice/validate-password";
    
    return this.myHttpCli.post<boolean>(url,user,{withCredentials:true});
  }


  getFollowers(userId: number): Observable<User[]>{
    let url: string = `http://localhost:9080/api/userservice/follow/follower/${userId}`;
    
    return this.myHttpCli.get<User[]>(url,{withCredentials:true});
  }

  getFollowees(userId: number): Observable<User[]>{
    let url: string = `http://localhost:9080/api/userservice/follow/followee/${userId}`;
    return this.myHttpCli.get<User[]>(url,{withCredentials:true});
  }

  followUser(follow: Follow): Observable<boolean>{
    console.log("FOLLOW BB",follow)
    let url: string = `http://localhost:9080/api/userservice/follow`;
    return this.myHttpCli.post<boolean>(url,follow,{withCredentials:true});
  }

  unfollowUser(follow: Follow) : Observable<boolean>{
    console.log("UNFOLLOW BB",follow)
    let url: string = `http://localhost:9080/api/userservice/follow/${follow.follower.userID}/${follow.followee.userID}`;
    return this.myHttpCli.delete<boolean>(url,{withCredentials:true});
  }
  
}
