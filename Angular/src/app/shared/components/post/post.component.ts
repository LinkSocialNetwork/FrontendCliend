import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Comments } from '../../model/Comments';
import { Post } from '../../model/Post';
import { User } from '../../model/User';
import { CommentService } from '../../services/comment.service';
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

  @Output()
  getFollowingPosts: EventEmitter<void> = new EventEmitter();

  @Output()
  resetPage: EventEmitter<void> = new EventEmitter();

//---------------------------------------------------------------------------------------------------------------//


  constructor(private loginServ: LoginService,
    private commentService: CommentService) { }

  ngOnInit(): void {
  }

  //---------------------------------------------------------------------------------------------------------------//

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

//---------------------------------------------------------------------------------------------------------------//
  
  addNewComment(valueOfPost:Post){
    let commentText = (<HTMLInputElement>document.getElementById(<string><unknown>valueOfPost.postId)).value;

    console.log("commentText= "+ commentText)
    if(commentText.length==0){
      Swal.fire({
        icon: 'warning',
        title: 'please Write a comment first',
        timer: 8000,
        showConfirmButton: true
      });
      return;
    }

    let newComment:Comments = {
      "commentId":0,
      "commentContent":commentText,
      "commentedAt":<string>(<unknown>new Date().getTime()),
      "commentWriter":this.loginServ.getCurrent(),
      "commentPost":valueOfPost
    }
    
      this.commentService.insertNewComment(newComment).subscribe(
        data=>{
          
          //gets everyone's post
          //this.getAllPosts();
          this.resetPage.emit();
          this.getFollowingPosts.emit();
          this.loginServ.triggerRetrieveCurrent();
        }
      );
  }

  //---------------------------------------------------------------------------------------------------------------//


}
