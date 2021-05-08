import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../model/Comments';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private myHttpCli:HttpClient) { }

  insertNewComment(comment:Comments):Observable<string>{
    let url:string="http://localhost:9080/api/postservice/protected/comment";
    return this.myHttpCli.post<string>(url,comment,{withCredentials:true});
  }
}
