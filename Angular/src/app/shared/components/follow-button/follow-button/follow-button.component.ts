import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  loggedInUser:User;

  @Input()
  searchedUser:User;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  following:boolean = true;

  toggleFollow():void {
    this.following = !this.following;
    this.loggedInUser = this.loginService.getCurrent();

    //this.loggedInUser.

    //this.userService.updateUser()
    console.log(this.searchedUser);
  }

}
