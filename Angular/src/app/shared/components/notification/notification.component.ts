import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notifications } from '../../model/Notifications';
import { Post } from '../../model/Post';
import { User } from '../../model/User';
import { GetUserService } from '../../services/get-user.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  notification: Notifications;

  @Output()
  refreshNav: EventEmitter<void> = new EventEmitter<void>();

  triggeredUser: User;
  post: Post;

  triggeredUsername: string;

  notificationId: number;

  constructor(private getUserServ: GetUserService, private notificationServ: NotificationService) { }
  
  ngOnInit(): void {
    this.getUserServ.getUserById(this.notification.triggeredId).subscribe(data => {
      this.triggeredUser=data;
      this.triggeredUser.profileImg = data.profileImg;
      this.triggeredUsername = data.userName;
    })
    this.notificationId = this.notification.id;
  }

  markAsRead(): void{
    console.log(this.notification.id);
    this.notificationServ.markAsRead(this.notificationId).subscribe();
    this.refreshNav.emit();
  }

}
