import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../model/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  

  constructor(private http: HttpClient) { }


  imageUpload(imageForm: FormData): Observable<ResponseMessage>{
    // we need to create S3 url to retraive the image url 
    let url:string ="http://localhost:9080/api/userservice/image";
    return this.http.post<ResponseMessage>(url,imageForm,{withCredentials:true});
  }

  postImageUpload(file:FormData):Observable<ResponseMessage>{
    let url:string ="http://localhost:9080/api/postservice/image";
    return this.http.post<ResponseMessage>(url,file,{withCredentials:true});
  }

}
