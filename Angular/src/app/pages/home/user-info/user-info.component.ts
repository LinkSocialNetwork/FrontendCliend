import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/model/User';
import { LoginService } from '../../../shared/services/login.service';

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
    profile_img_url: '',
    bio: '',
    posts: null,
    likes: null,
    firstName:'',
    lastName:''
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
