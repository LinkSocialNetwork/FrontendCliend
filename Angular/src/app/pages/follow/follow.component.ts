import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/User';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  currentFollowType: string = "follower"
  currentUser: User = null;
  followers: User[];
  following: User[];
  theme: string = 'light';

  constructor(
    private router: ActivatedRoute,
    private userServ: UserService,
    private getUserServ: GetUserService,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('theme')!=undefined){
      this.theme =window.localStorage.getItem('theme');
    }
    this.router.params.subscribe((params) => {
      this.currentFollowType = params['followType'];
      this.currentUser = this.loginService.getCurrent();
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
