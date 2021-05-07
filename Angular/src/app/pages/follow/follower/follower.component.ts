import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';

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

  searchForm = this.formBuilder.group({
    userName: '',
  });

  constructor(    
    private formBuilder: FormBuilder,
    private loginServ: LoginService
    ) { }

  ngOnInit(): void {
  }



}
