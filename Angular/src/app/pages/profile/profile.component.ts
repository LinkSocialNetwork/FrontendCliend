import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetPostService } from 'src/app/shared/services/get-post.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

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

  currentUser: User = {
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
    private loginService: LoginService,
    private userServ: UserService,
    private getUserServ: GetUserService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.currentUser.userID = params['id'];
      this.getUserServ
        .getUserById(this.currentUser.userID)
        .subscribe((data) => {
          this.currentUser=data;
          this.userServ.getFollowers(data.userID).subscribe((data2) => {
            this.followers = data2;
          });
          this.userServ.getFollowees(data.userID).subscribe((data3) => {
            this.following = data3;
          });
        });
    });
  }
}
