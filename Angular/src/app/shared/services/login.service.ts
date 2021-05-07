import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser: User = null;

  constructor(private httpCli:HttpClient, private cookieService: GetCookieService) { }

  loginUser(user:User): Observable<any> {
    let url:string="http://localhost:9080/api/userservice/login";
    const httpPost ={
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.httpCli.post<any>(url,user,httpPost);
  }

  logoutUser(): Observable<string>{
    let url: string="http://localhost:9080/api/userservice/user/logout";
    return this.httpCli.get<string>(url, {withCredentials:true});
  }

  getLoggedInUser(): Observable<User>{
    let authtoken = this.cookieService.getCookie("token")
    
    return this.httpCli.get<User>(`http://localhost:9080/api/userservice/checkToken`, {
      headers: {
        token: authtoken
      }, withCredentials:true
    })
  }

  getCurrent():User{
    if(this.currentUser==null || this.currentUser==undefined){
      this.getLoggedInUser().subscribe(
        data =>{
          this.currentUser=data;
        }
      )
    }
    
    return this.currentUser;
  }
  setCurrent(user:User):void{
    this.currentUser=user;
  }

  triggerRetrieveCurrent():void{
    this.getLoggedInUser().subscribe(
      data=>{
        console.log("Retrieve Triggered")
        this.setCurrent(data);
      }
    )
  }

  resetPassword(userName:string):Observable<string>{
    let url:string = "http://localhost:9080/api/userservice/resetPassword";
    return this.httpCli.post<string>(url,userName,{withCredentials:true});
  }
}
