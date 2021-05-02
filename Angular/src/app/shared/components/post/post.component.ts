import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../model/Post';
import { User } from '../../model/User';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  @Input()
  currentUser: User;

  constructor(private loginServ: LoginService) { }

  ngOnInit(): void {
  }

  checkIfPostIsLiked(post:Post):boolean{
    let loggedInUser:User = this.loginServ.getCurrent();
    for(var like of post.usersWhoLiked){//will search the post for the Like that connects the user and post

      for(var likeOfUser of loggedInUser.likes){
        if(like.likeId===likeOfUser.likeId){
          return true;
        }
      }
    }
    return false;
  }

}
