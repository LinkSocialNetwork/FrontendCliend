import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  loggedInUser:User={
    userID: 0,
    userName: '',
    password: '',
    email: '',
    dob:'',
    profileImg: '',
    bio: '',
    posts: null,
    likes: null,
    firstName:'',
    lastName:'',
    following: []
  };

  followers: User[] = [];
  following: User[] = [];

  @Output()
  newFollowingEmitter:EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private loginServ:LoginService, private userServ: UserService) { }

  ngOnInit(): void {
    this.loginServ.getLoggedInUser().subscribe(
      userData => {
        
        this.loggedInUser=userData;
        this.loginServ.setCurrent(this.loggedInUser);

        if(userData !== null){
          this.userServ.getFollowers(userData.userID).subscribe(followersData => {
            this.followers = followersData;
          })

          this.userServ.getFollowees(userData.userID).subscribe(followeeData => {
            this.following = followeeData;
            this.newFollowingEmitter.emit(this.following);
          })
        }
      }
    )

  }
}
