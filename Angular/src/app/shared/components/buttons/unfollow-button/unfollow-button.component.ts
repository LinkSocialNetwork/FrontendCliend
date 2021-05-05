import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Follow } from 'src/app/shared/model/Follow';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-unfollow-button',
  templateUrl: './unfollow-button.component.html',
  styleUrls: ['./unfollow-button.component.css']
})
export class UnfollowButtonComponent implements OnInit {

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

  disabled: boolean = false;

  @Input()
  searchedUser:User;

  @Output()
  isFollowing: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private loginService:LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(data => {
      this.loggedInUser = data;
    })
  }


  /* unfollow search user */
  unfollowUser():void{
    let follow: Follow = {
      followID: null,
      follower: this.loggedInUser,
      followee: this.searchedUser
    }

    this.disabled = true;
    this.userService.unfollowUser(follow).subscribe(data => {
      this.isFollowing.emit(false);
    })
    
  }


}
