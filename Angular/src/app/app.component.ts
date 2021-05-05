
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notifications } from './shared/model/Notifications';
import { User } from './shared/model/User';
import { GetCookieService } from './shared/services/get-cookie.service';
import { LoginService } from './shared/services/login.service';
import { NotificationService } from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(){
  }

  ngOnInit(): void {

  }

}
