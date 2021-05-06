import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
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

  searchForm = this.formBuilder.group({
    userName: '',
  });

  constructor(    
    private formBuilder: FormBuilder,
    private userServe: UserService) { }

  ngOnInit(): void {
  }



}
