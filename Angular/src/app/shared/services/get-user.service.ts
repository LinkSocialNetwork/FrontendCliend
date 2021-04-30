import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private myHttpCli:HttpClient,private cookieService:GetCookieService) { }

  getAllUsers():Observable<User[]> {
    let url:string="http://localhost:9080/api/userservice/user";
    return this.myHttpCli.get<User[]>(url,{withCredentials:true});
  }

  getUserById(id:number): Observable<User> {
    let url:string =`http://localhost:9080/api/userservice/user/${id}`;
    return this.myHttpCli.get<User>(url,{withCredentials:true})
  }

  getCurrentUser(): Observable<User> {
    let authtoken = this.cookieService.getCookie("token")
    console.log(authtoken); 
    if(authtoken) {
    return this.myHttpCli.get<User>(`http://localhost:9080/api/userservice/checkToken`, {
      headers: {
        token: authtoken
      }, withCredentials:true
    })}
  }
}
