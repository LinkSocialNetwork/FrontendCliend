import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/User';
import { DateService } from 'src/app/pipes/date.service';
import { GetCookieService } from 'src/app/shared/services/get-cookie.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  container: any;
  registrationForm = this.formBuilder.group({
    userName: '',
    password: '',
    email: '',
    dob: '',
  });
  loginForm = this.formBuilder.group({
    userName: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dobModifier: DateService,
    private loginService: LoginService,
    private getUserService: GetUserService,
    private userService: UserService,
    private cookieService: GetCookieService
  ) {}

  ngOnInit(): void {
    this.container = document.getElementById('container');

    let authtoken = this.cookieService.getCookie('token');
    if (authtoken) {
      this.loginService.getLoggedInUser().subscribe((data) => {
        if (data) {
          this.router.navigate(['/home']);
        }

        this.loginService.setCurrent(data);
        console.log('data is null');
      });
    }
  }

  openLogin() {
    this.container.classList.remove('right-panel-active');
  }

  openRegistration() {
    this.container.classList.add('right-panel-active');
  }

  onLoginSubmit() {
    Swal.fire({
      title: 'LOGGING IN ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 4000,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    let user: User = {
      userID: null,
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
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
    this.loginService.loginUser(user).subscribe((RCurrentUser) => {
      if (RCurrentUser) {
        Swal.fire({
          icon: 'success',
          title: 'Logged IN',
          timer: 4000,
          showConfirmButton: true,
        });
        document.cookie = `token=${RCurrentUser.authToken}`;
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Wrong User Name OR Password',
          timer: 4000,
          showConfirmButton: true,
        });
      }
      return RCurrentUser;
    });
  }

  onRegistrationSubmit() {
    Swal.fire({
      title: 'Creating New Account ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 4000,
      onOpen: () => {
        Swal.showLoading();
      },
    });

    let user: User = {
      userID: null,
      userName: this.registrationForm.value.userName,
      password: this.registrationForm.value.password,
      email: this.registrationForm.value.email,
      dob: this.dobModifier.dobModifier(this.registrationForm.value.dob),
      profileImg: null,
      bio: '',
      posts: null,
      likes: null,
      firstName: '',
      lastName: '',
      checkPassword:0,
      checkEmail:1,
      following: []
    };
    this.userService.insertNewUser(user).subscribe((data) => {
      if (data.message == 'User was created') {
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          timer: 4000,
          showConfirmButton: true,
        });
        this.container.classList.remove('right-panel-active');
        (<HTMLInputElement>(
          document.getElementById('loginuserName')
        )).value = this.registrationForm.value.userName;
        this.loginForm.value.userName = this.registrationForm.value.userName;
        (<HTMLInputElement>(
          document.getElementById('loginpassword')
        )).value = this.registrationForm.value.password;
        this.loginForm.value.password = this.registrationForm.value.password;
      } else if (data.message == 'Username already exists in system') {
        Swal.fire({
          icon: 'warning',
          title: 'Username already taken',
          timer: 4000,
          showConfirmButton: true,
        });
      } else if (data.message == 'email already exists in system') {
        Swal.fire({
          icon: 'warning',
          title: 'Email already taken',
          timer: 4000,
          showConfirmButton: true,
        });
      } else if (data.message == 'Could not create user') {
        Swal.fire({
          icon: 'warning',
          title: 'Could not create user at this time',
          timer: 4000,
          showConfirmButton: true,
        });
      }
    });
  }

  onPasswordReset(): void {
    Swal.fire({
      title: 'Enter your user name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on',
      },
      showCancelButton: true,
      confirmButtonText: 'Reset Password',
      showLoaderOnConfirm: true,
      preConfirm: (userToReset) => {
        Swal.fire({
          title: 'Sending Password Reset Email',
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 8000,
          onOpen: () => {
            Swal.showLoading();
          },
        });
        this.loginService.resetPassword(userToReset).subscribe((data) => {
          if (data.message=="no user with this user name") {
            Swal.fire({
              icon: 'error',
              title: 'Given Username is not in our system',
              timer: 10000,
              showConfirmButton: true,
            });
          }else if(data.message=="Email sent."){
            Swal.fire({
              icon: 'success',
              title: "Rest Email Sent\n check spam folder if you can't see it in the inbox.",
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
