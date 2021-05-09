import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

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
    checkPassword:0,
    checkEmail:0,
    following: []
  };

  followers: User[] = [];
  following: User[] = [];

  visible=true;

  @Output()
  newFollowingEmitter:EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private loginServ:LoginService, private userServ: UserService) { }

  ngOnInit(): void {
    this.loginServ.getLoggedInUser().subscribe(
      data => {
        
        this.loggedInUser=data;
        this.loginServ.setCurrent(this.loggedInUser);

        if(data !== null){
          this.userServ.getFollowers(data.userID).subscribe(data => {
            this.followers = data;
          })

          this.userServ.getFollowees(data.userID).subscribe(data => {
            this.following = data;
            this.newFollowingEmitter.emit(this.following);
          })
        }
      }
    )

  }

  dismiss(){
    this.visible = false;
  }

  verifyEmail(){
    let code = this.generateTempCode(5)
    let user:User= {
      userID: null,
      userName:null,
      password: null,
      email: null,
      dob: null,
      profileImg: null,
      bio: null,
      posts: null,
      likes: null,
      firstName: '',
      lastName: '',
      checkPassword:0,
      checkEmail:0,
      following: [],
    };
    user.userName = this.loggedInUser.userName;
    user.firstName = code;
    user.lastName = "sendEmail";

    Swal.fire({
      title: 'Sending Email...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 8000,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    this.userServ.verifyEmail(user).subscribe(

      data =>{
        if (data.message=="sent"){
          
          Swal.fire({
            title: 'A Verification Email has been sent, check your inbox or spam box, and enter the code ',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'on',
            },
            showCancelButton: true,
            confirmButtonText: 'Verify',
            showLoaderOnConfirm: true,
            preConfirm: (EnteredCode) => {
              Swal.fire({
                title: 'Checking the code...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 8000,
                onOpen: () => {
                  Swal.showLoading();
                },
              });
              user.lastName=EnteredCode;
              user.firstName =code;
              this.userServ.verifyEmail(user).subscribe((data) => {
                if (data.message=="wrong code") {
                  Swal.fire({
                    icon: 'error',
                    title: 'You need to enter the right code, try again',
                    timer: 10000,
                    showConfirmButton: true,
                  });
                }else if(data.message=="email Verified"){
                  Swal.fire({
                    icon: 'success',
                    title: "Thank you. Your email is Verified",
                    timer: 10000,
                    showConfirmButton: true,
                  });
                }
                
              });
            },
            allowOutsideClick: () => !Swal.isLoading(),
          })

        }

      }
    );

  }

  generateTempCode(length:number):string {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}
}
