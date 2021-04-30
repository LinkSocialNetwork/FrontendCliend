import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  updateUser(user:User): Observable<HttpResponse<string>>{
    let authtoken = this.cookieService.getCookie("token")
    console.log(authtoken);

    let url: string = "http://localhost:9080/api/userservice/user";
    console.log(" inside the user update  >>> "+user);
    if(authtoken) {
      return this.myHttpCli.put<HttpResponse<string>>(url,user,{
        headers: {
          token: authtoken
        }, withCredentials:true
      });
    }
  }

  deleteUser(id:number): void{
    let url: string = `http://localhost:9080/api/userservice/user/${id}`;
    //TODO: change in Java from deletemapping to postmapping
    this.myHttpCli.delete<HttpResponse<ArrayBuffer>>(url);
  }

  checkOldPass(user:User): Observable<HttpResponse<string>>{
    let url: string = "http://localhost:9080/api/userservice/user/validate-password";
    
    return this.myHttpCli.post<HttpResponse<string>>(url,user,{withCredentials:true});
  }

  
}
