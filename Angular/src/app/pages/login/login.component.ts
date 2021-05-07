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
      following: [],
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
          title: '"Username already taken',
          timer: 4000,
          showConfirmButton: true,
        });
      } else if (data.message == 'email already exists in system') {
        Swal.fire({
          icon: 'warning',
          title: '"Email already taken',
          timer: 4000,
          showConfirmButton: true,
        });
      } else if (data.message == 'Could not create user') {
        Swal.fire({
          icon: 'warning',
          title: '"Could not create user at this time',
          timer: 4000,
          showConfirmButton: true,
        });
      }
    });
  }

  onPasswordReset(): void {
    Swal.fire({
      title: 'Enter Your userName',
      input: 'text',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Send Email',
      showLoaderOnConfirm: true,
      preConfirm: (userToReset) => {
        this.loginService.resetPassword(userToReset).subscribe((data) => {
          console.log('Password reset result: ' + data);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent: check spam folder if you cant see it yet or try again.',
          timer: 4000,
          showConfirmButton: true,
        });
      }
      if(result.isDenied){
        Swal.fire({
          icon: 'error',
          title: 'Given Username is not in our system',
          timer: 4000,
          showConfirmButton: true,
        });
      }
    });
  }
}
