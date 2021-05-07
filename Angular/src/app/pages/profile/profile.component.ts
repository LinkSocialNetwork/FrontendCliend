import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  posts: Post[] = [];
  mySubscription: any;
  appCom: HTMLElement;
  isChecked: boolean = false;
  isFollowing: boolean = null;
  editable: boolean = false;
  theme: string = 'light';

  profileUser: User = {
    userID: 0,
    userName: '',
    password: '',
    email: '',
    dob: '',
    profileImg: '',
    bio: '',
    posts: null,
    likes: null,
    firstName: '',
    lastName: '',
    following: [],
  };

  followers: User[];
  following: User[];

  // This will hold the updated profile pic file
  updatedImage: File = null;

  // This will hold all the password update fields
  newPassword1: string = '';
  newPassword2: string = '';
  oldPassword: string = '';

  isOldPasswordValid = true;

  constructor(
    private router: ActivatedRoute,
    private userServ: UserService,
    private getUserServ: GetUserService,
    private loginServ: LoginService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.profileUser.userID = params['id'];
      this.getUserServ
        .getUserById(this.profileUser.userID)
        .subscribe((data) => {
          this.profileUser=data;
          this.loginServ.getLoggedInUser().subscribe(loggedInUser =>{
            if(loggedInUser.userID==data.userID){
              this.editable = true;
            }
          });
          this.userServ.getFollowers(data.userID).subscribe((data2) => {
            this.followers = data2;
          });
          this.userServ.getFollowees(data.userID).subscribe((data3) => {
            this.following = data3;
          });
        });
    });
  }

  toggleFollowing(bool: boolean) {
    this.isFollowing = !this.isFollowing;
  }

}
