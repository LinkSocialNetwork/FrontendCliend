import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts:Post[]=[];
  mySubscription: any;
  appCom: HTMLElement;
  isChecked:boolean = false;
  
  currentUser:User = {
    userID: 0,
    userName: '',
    password: '',
    email: '',
    dob: '',
    profileImg: '',
    bio: '',
    posts: null,
    likes: null,
    firstName:'',
    lastName:'',
    following: []
  };

  // This will hold the updated profile pic file
  updatedImage:File=null;

  // This will hold all the password update fields
  newPassword1:string = '';
  newPassword2:string = '';
  oldPassword:string = '';

  isOldPasswordValid = true;
  
  constructor( private router:Router,
    private loginService:LoginService) {  }

  ngOnInit(): void {

    // Get the currently logged in user and set it
    this.loginService.getLoggedInUser().subscribe(
      data =>{
        if(data==null){
          this.router.navigate(['/login']);
        }
        else {
          //force update the current user
          this.loginService.setCurrent(data);
          
          this.currentUser = data;

        }
      }
    )
  }

}
