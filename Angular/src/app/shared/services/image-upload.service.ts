import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../model/ResponseMessage';
import { GetCookieService } from './get-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  

  constructor(private http: HttpClient, private cookieService: GetCookieService) { }


  imageUpload(imageForm: FormData): Observable<ResponseMessage>{
    // we need to create S3 url to retraive the image url 
    let authtoken = this.cookieService.getCookie("token")
    let url:string ="http://localhost:9080/api/userservice/protected/image";
    return this.http.post<ResponseMessage>(url,imageForm,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }

  postImageUpload(file:FormData):Observable<ResponseMessage>{
    let authtoken = this.cookieService.getCookie("token")
    let url:string ="http://localhost:9080/api/postservice/protected/image";
    return this.http.post<ResponseMessage>(url,file,{
      headers: {
        token: authtoken
      }, withCredentials:true
    });
  }

}
