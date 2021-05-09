import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/User';
import { GetCookieService } from 'src/app/shared/services/get-cookie.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {

  @Input()
  followers: User[];

  @Input()
  currentUser: User;

  isFollowing:boolean = false;
  theme: string = 'light';

  searchForm = this.formBuilder.group({
    userName: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginServ: LoginService,
    private cookieService: GetCookieService,
    private router: Router,
    private userServ: UserService
    ) { }

  ngOnInit(): void {

    let authtoken = this.cookieService.getCookie("token")
    if(!authtoken)
      this.router.navigate(['login'])

    if(window.localStorage.getItem('theme')!=undefined){
      this.theme =window.localStorage.getItem('theme');
    }

    this.loginServ.getLoggedInUser().subscribe(
      data => {
        
        this.currentUser=data;
        this.loginServ.setCurrent(this.currentUser);

        if(data !== null){

          this.userServ.getFollowers(data.userID).subscribe(data => {
            this.followers = data;
          })
        }
      }
    )
  }

  toggleTheme(): void{
    if(this.theme==='light'){
      this.theme='dark';
      window.localStorage['theme'] = this.theme;
      return;
    }
    if(this.theme==='dark'){
      this.theme='light';
      window.localStorage['theme'] = this.theme;
      return;
    }
  }



}
