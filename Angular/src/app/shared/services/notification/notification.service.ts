import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifications } from '../../model/Notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpCli: HttpClient) { }

  getAllNotifications(userId: number):Observable<Notifications[]> {
    return this.httpCli.get<Notifications[]>(`http://localhost:9080/api/notificationservice/user/${userId}`, {withCredentials:true});
  }

  getOneNotification(notificationId: number):Observable<Notifications> {
    return this.httpCli.get<Notifications>(`http://localhost:9080/api/notificationservice/${notificationId}`, {withCredentials:true});
  }
  
}
