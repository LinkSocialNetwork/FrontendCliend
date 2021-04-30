import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';


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
    profile_img_url: '',
    bio: '',
    posts: null,
    likes: null,
    firstName:'',
    lastName:'',
    following: []
  };;
  constructor(private loginServ:LoginService) { }

  ngOnInit(): void {
    let info:any=null;
    info = this.loginServ.getLoggedInUser().subscribe(
      data => {
        
        this.loggedInUser=data;
        this.loginServ.setCurrent(this.loggedInUser);
        return data;
      }
    )
  }

}
