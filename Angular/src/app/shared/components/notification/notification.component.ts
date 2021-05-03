import { Component, Input, OnInit } from '@angular/core';
import { Notifications } from '../../model/Notifications';
import { Post } from '../../model/Post';
import { User } from '../../model/User';
import { GetUserService } from '../../services/get-user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  @Input()
  notification: Notifications;

  triggeredUser: User;
  post: Post;

  constructor(private getUserServ: GetUserService) { }
  
  ngOnInit(): void {
    this.getUserServ.getUserById(this.notification.triggeredId).subscribe(data => {
      this.triggeredUser=data;
      this.triggeredUser.profileImg = data.profileImg;
    })
  }

}
