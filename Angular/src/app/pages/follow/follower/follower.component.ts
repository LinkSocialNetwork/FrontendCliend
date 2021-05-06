import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
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

  constructor(    private userServe: UserService
    ) { }

  ngOnInit(): void {
  }

  toggleFollowing(bool: boolean){
    console.log("TOGGLE FOLLOWING TRIGGERED")
    this.isFollowing = !this.isFollowing;
    
  }

}
