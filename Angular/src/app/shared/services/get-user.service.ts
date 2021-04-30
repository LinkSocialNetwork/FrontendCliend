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
    let url:string="http://localhost:9080/api/userservice/user";
    return this.myHttpCli.get<User[]>(url,{withCredentials:true});
  }

  getUserById(id:number): Observable<User> {
    let url:string =`http://localhost:9080/api/userservice/user/${id}`;
    return this.myHttpCli.get<User>(url,{withCredentials:true})
  }

  getCurrentUser(): Observable<User> {
    const httpPost ={
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'withCredentials':'true'
      })
    }
    let url:string =`http://localhost:9080/api/userservice/checkToken`;
    return this.myHttpCli.get<User>(url,{withCredentials:true})
  }
}