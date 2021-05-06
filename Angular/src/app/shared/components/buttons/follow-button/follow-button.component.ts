import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Follow } from 'src/app/shared/model/Follow';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  loggedInUser:User = {
    'userID': null,
    'userName':null,
    'password':null,
    'email':null,
    'dob': null,
    'profileImg':null,
    'bio':null,
    'firstName':null,
    'lastName':null,
    'posts':[],
    'likes':[],
    'following': []
  };
  followStatus:boolean = false;
  disabled: boolean = false;

  @Input()
  searchedUser:User;

  constructor(private loginService:LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(data => {
      this.loggedInUser = data;
    })
  }


  /* follow search user */
  followUser():void{
    let follow: Follow = {
      followID: null,
      follower: this.loggedInUser,
      followee: this.searchedUser
    }

    this.disabled = true;
    this.userService.followUser(follow).subscribe(data => {
    })
  }

}
