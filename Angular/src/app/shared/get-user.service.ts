import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private myHttpCli:HttpClient) { }

  getAllUsers():Observable<User[]> {
    let url:string="http://localhost:9080/api/userservice/getAllUsers";
    return this.myHttpCli.get<User[]>(url,{withCredentials:true});
  }

  getUserById(userId:number): Observable<User> {
    let url:string =`http://localhost:9080/api/userservice/getUserById/${userId}`;
    return this.myHttpCli.get<User>(url,{withCredentials:true})
  }

  getCurrentUser(): Observable<User> {
    const httpPost ={
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'withCredentials':'true'
      })
    }
    let url:string =`http://localhost:9080/api/userservice/getLoggedInUser`;
    return this.myHttpCli.get<User>(url,{withCredentials:true})
  }
}
