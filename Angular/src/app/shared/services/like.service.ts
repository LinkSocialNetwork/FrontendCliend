import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../model/LIke';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private myHttpCli:HttpClient, private cookieService: GetCookieService) { }

  insertNewLike(like:Like):Observable<string>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string=`http://localhost:9080/api/postservice/protected/post/like`;
    return this.myHttpCli.post<string>(url,like,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }
  deleteLike(like:Like):Observable<ArrayBuffer>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string = `http://localhost:9080/api/postservice/protected/like/${like.likeId}`;
    return this.myHttpCli.delete<ArrayBuffer>(url,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }
}
