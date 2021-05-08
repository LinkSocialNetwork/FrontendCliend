import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input()
  following: User[];

  @Input()
  currentUser: User;

  isFollowing:boolean = true;
  theme: string = 'light';

  searchForm = this.formBuilder.group({
    userName: '',
  });

  constructor(private formBuilder: FormBuilder, private loginServ: LoginService, private userServ: UserService) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('theme')!=undefined){
      this.theme =window.localStorage.getItem('theme');
    }

    this.loginServ.getLoggedInUser().subscribe(
      data => {
        
        this.currentUser=data;
        this.loginServ.setCurrent(this.currentUser);

        if(data !== null){

          this.userServ.getFollowees(data.userID).subscribe(data => {
            this.following = data;
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
