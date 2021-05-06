import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';


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

  followers: User[];
  following: User[];


  // This will hold the updated profile pic file
  updatedImage:File=null;

  // This will hold all the password update fields
  newPassword1:string = '';
  newPassword2:string = '';
  oldPassword:string = '';

  isOldPasswordValid = true;
  
  constructor( private router:Router,
    private loginService:LoginService,
    private userServ: UserService) {  }

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
        this.userServ.getFollowers(data.userID).subscribe(data2 => {
          this.followers = data2;
        })
        this.userServ.getFollowees(data.userID).subscribe(data3 => {
          this.following = data3;
        })
      }
      
    )
  }

}
