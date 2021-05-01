import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit, OnChanges, OnDestroy {

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

  @Input()
  searchedUser:User;

  constructor(private loginService:LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.followStatus = this.checkFollowStatus();
  }

  ngOnChanges(): void {
    this.followStatus = this.checkFollowStatus();

    this.userService.updateUser(this.loggedInUser).subscribe( data => {
    })
  }

  ngOnDestroy(): void {
    this.userService.updateUser(this.loggedInUser).subscribe( data => {
    })
  }


  checkFollowStatus(): boolean {
      if (!this.loggedInUser.following) {
              this.loggedInUser.following = [];
      }
      return this.loggedInUser.following.includes(this.searchedUser);

  }


  toggleFollow():void {

    //probably need to sendd the logged in information back up to the service 

    //should think if we are going to get the whole list of users or just the ids 
    // think of solutions 

    if (!this.followStatus) {
      this.followStatus = !this.followStatus;
      this.loggedInUser = this.loginService.getCurrent();
      //need to change this for later use
      if (!this.loggedInUser.following) {
              this.loggedInUser.following = [];
      }
      this.loggedInUser.following.push(this.searchedUser);

    } else {
      this.followStatus = !this.followStatus;
      this.loggedInUser = this.loginService.getCurrent();
      let index: number = this.loggedInUser.following.indexOf(this.searchedUser);
      this.loggedInUser.following.splice(index, index+1);
    }





    //this.userService.updateUser()
    console.log(this.loggedInUser);
    console.log(this.searchedUser);

  }

}
