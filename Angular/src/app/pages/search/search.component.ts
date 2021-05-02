
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Like } from 'src/app/shared/model/LIke';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetPostService } from 'src/app/shared/services/get-post.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users:User[];
  selectedUser:User = {
    userID: 0,
    userName: '',
    password: '',
    email: '',
    dob: null,
    profileImg: '',
    bio: '',
    posts: null,
    likes: null,
    firstName:'',
    lastName:'',
    following: []
  }
  currentUser: User;
  /* variable to check if user is following searched user */
  isFollowing: boolean = null;
  userPosts:Post[];
  searchForm = this.formBuilder.group({
    userName: ''
    });
  
  constructor(private formBuilder: FormBuilder, private getUserService:GetUserService,
    private getPostService:GetPostService,
    private loginServ:LoginService,
    private likeServ:LikeService,
    private router:Router,
    private userServe: UserService
    ) { }

  ngOnInit(): void {

    this.loginServ.getLoggedInUser().subscribe(data =>{
        if(data==null){
          this.router.navigate(['/login']);
        }
        else {
          this.currentUser=data;
        }
      })

    this.getUserService.getAllUsers().subscribe(
      data => {
        this.users = data ;
        
      }
    );


  }

  toggleFollowing(bool: boolean){
    console.log("TOGGLE FOLLOWING TRIGGERED")
    this.isFollowing = bool;
    
  }


  selectUser(){
    for (const user of this.users) {
      if(user.userName==this.searchForm.value.userName){
        this.selectedUser=user;
        //verify user is following selected user
        this.userServe.getFollowers(this.selectedUser.userID).subscribe(data => {
          let found = data.find(element => element.userID === this.currentUser.userID)
          console.log("FOUND",found, data)
          if(found)
            this.isFollowing = true;
          else
            this.isFollowing = false;
        })
      }
    }
    this.getAllPosts();

  }

  getAllPosts():void{
    this.getPostService.getPostsCreatedByUser(this.selectedUser.userID).subscribe(
      data =>{
        
        let newPosts:Post[];
        newPosts=data;
        newPosts.sort((a,b) => (a.postedAt > b.postedAt) ? -1 : ((b.postedAt > a.postedAt) ? 1 : 0))
        this.userPosts= newPosts;
      }
    );
  }

  selectUserByKey(event:any){
    for (const user of this.users) {
      if(user.userName==this.searchForm.value.userName){
        this.selectedUser=user;
      }
    }
    this.getPostService.getPostsCreatedByUser(this.selectedUser.userID).subscribe(

      data =>{
        this.userPosts= data;
      }
    );
  }

  toggleLike(valueOfPost:Post,isLiked:boolean){
    console.log("/////////////IN TOGGLE LIKE: POST IS LIKED:"+isLiked);
    if(isLiked){//if the Post is liked by the User it will call delete
      //first get the loggedInUser
      console.log("/////////////DELETING LIKE");
      let loggedIn:User = this.loginServ.getCurrent();
      let valueOfLike:Like|null = null;
      let found:boolean=false;
      for(var like of valueOfPost.usersWhoLiked){//will search the post for the Like that connects the user and post
        for(var likeOfUser of loggedIn.likes){
          console.log("Like id:"+like.likeId+" likeOfUser:"+likeOfUser.likeId);
          if(like.likeId===likeOfUser.likeId){
            valueOfLike=like;
            found=true;
            break;
          }
        }
        if(found){
          break;
        }
      }
      this.likeServ.deleteLike(valueOfLike).subscribe(
        data=>{
          console.log(data);
          this.getAllPosts();
          this.loginServ.triggerRetrieveCurrent();
          
        }
      );
    }
    else{
      let newLike:Like = {"likeId":0,"user":this.loginServ.getCurrent(),"post":valueOfPost}
      console.log("////////////NEWLIKE: POST:"+newLike.post.postId +" USER:"+newLike.user.userID +" "+newLike.user.userName+" "+JSON.stringify(newLike.user.likes));

      this.likeServ.insertNewLike(newLike).subscribe(
        data=>{
          console.log(data);
          this.getAllPosts();
          this.loginServ.triggerRetrieveCurrent();
        }
      );
    }
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


