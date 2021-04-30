import { Component, Input, OnInit } from '@angular/core';
import { Notifications } from '../../model/Notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  @Input()
  notification: Notifications;

  constructor() { }

  ngOnInit(): void {
  }

}
