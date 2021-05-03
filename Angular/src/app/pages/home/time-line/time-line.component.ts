import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Comments } from 'src/app/shared/model/Comments';
import { Like } from 'src/app/shared/model/LIke';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { CommentService } from 'src/app/shared/services/comment.service';
import { GetPostService } from 'src/app/shared/services/get-post.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { PostService } from 'src/app/shared/services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit,OnDestroy {

  @Input()
  following:User[]=[];

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(pos == max )   {
      //Do your action here
      this.addPage()
    }
  }

  page:number = 0;

  currentUser:User;
  postContrnt: string = null;
  youtubeUrl: string = null;
  postimg: string = null;
  postImage:File=null;
  imageURL: string;
  posts:Post[]=[];

  constructor(private postservice:PostService,
    private getPostService:GetPostService,
    private loginServ:LoginService,
    private likeServ:LikeService,
    private imageServ:ImageUploadService,
    private getUserService:GetUserService,
    private commentService:CommentService,
    public fb: FormBuilder
    ) {}

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  ngOnInit(): void {
    this.getUserService.getCurrentUser().subscribe(
      data=>{
        this.currentUser=data;
        this.getFollowingPosts();
      }
    );
  }

  
  addPage() {
      this.page += 1;
      this.getFollowingPosts();
  }

  resetPage() {
    this.posts = [];
    this.page = 0;
    this.getFollowingPosts();
  }

  scroll = (event): void => {
    const topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }

  handleFileInput(files:FileList){
    this.postImage=files.item(0);
  }

  // Notice: in P2 version handleFileInput was used to post an Image,
  // Changed function utilized to showPreview below
  showPreview(event){
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
       this.imageURL = reader.result as string; 
    }
    reader.readAsDataURL(file)
    this.postImage=file;
  }
  
  goToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //gets everyone's posts
    //this.getAllPosts();
    this.resetPage();
    this.getFollowingPosts();
  }

  getAllPosts():void{
    this.getPostService.getAllPosts().subscribe(
      data =>{
        let newPosts:Post[];
        newPosts=data;
        console.log(newPosts)
        newPosts.sort((a,b) => (a.postedAt > b.postedAt) ? -1 : ((b.postedAt > a.postedAt) ? 1 : 0))
        console.log(newPosts)
        this.posts= newPosts;
      }
    )
  }

  getFollowingPosts():void{
    this.getPostService.getUsersFollowingPosts(this.currentUser.userID,this.page).subscribe(
      data =>{
        let newPosts:Post[];
        newPosts=data;
        console.log("in getFollowingPosts" , newPosts)
        newPosts.sort((a,b) => (a.postedAt > b.postedAt) ? -1 : ((b.postedAt > a.postedAt) ? 1 : 0))
        console.log(newPosts)
        for (const post of newPosts) {
          this.posts.push(post);
        }
      }
    )
  }
  
  addPost(){
    if (this.postContrnt.length<5){
      Swal.fire({ 
        icon: 'warning',
        title: 'you need to add more than one or two words',
        timer: 8000,
        showConfirmButton: true
      });
      return;
    }
    if(this.youtubeUrl!=null){
      if((this.youtubeUrl.startsWith("https:")) || (this.youtubeUrl.startsWith("www."))||(this.youtubeUrl.length!=11)){
        Swal.fire({
          icon: 'warning',
          title: 'please enter a valid youtube vidoe ID ',
          timer: 8000,
          showConfirmButton: true
        });
        return;
      }
    }
    Swal.fire({
      title: 'Creating the post',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 4000,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    //todo add current user to the post object and image url to
    let post:Post = {
      'postId':0,
      'user':this.currentUser,
      'postTitle':"New Post",
      'postContent':this.postContrnt,
      'postImageUrl':null,
      'youtubeUrl':(this.youtubeUrl!=null)?"https://www.youtube.com/embed/"+this.youtubeUrl:null,
      'usersWhoLiked':[],
      'comments':[],
      'postedAt':<string>(<unknown>new Date().getTime())
    }
    if(this.postImage!=null){
      let file:FormData=new FormData;
      file.append("file",this.postImage)
      this.imageServ.postImageUpload(file).subscribe(
        data=>{
          post.postImageUrl=data.message;
          
          let response =  this.postservice.insertNewPost(post).subscribe(
            data =>{
              
              Swal.fire({ 
                icon: 'success',
                title: 'Created',
                timer: 4000,
                showConfirmButton: true
              });
              //gets everyone's post
              //this.getAllPosts();
              this.resetPage();
              this.getFollowingPosts();
              this.postImage=null;
              this.postContrnt=null;
              this.youtubeUrl=null;
              this.postimg=null;
            }
          )
        }
      )
    }
    else{
      let response =  this.postservice.insertNewPost(post).subscribe(
        data =>{
          
          Swal.fire({ 
            icon: 'success',
            title: 'Created',
            timer: 4000,
            showConfirmButton: true
          });
          //gets everyone's posts
          //this.getAllPosts();
          this.resetPage();
          this.getFollowingPosts();
          this.postImage=null;
          this.postContrnt=null;
          this.youtubeUrl=null;
          this.postimg=null;
        }
      )
    }
  }

  

  filterPosts(event: any){
    let matcher = new RegExp(event.target.value, "gi");

    for (var i=0;i<document.getElementsByClassName("postHolder").length;i++) {
      if (
        matcher.test(document.getElementsByClassName("posttext")[i].innerHTML)
      ) {
        (<HTMLElement>document.getElementsByClassName("postHolder")[i]).style.display="";
      } else {
        (<HTMLElement>document.getElementsByClassName("postHolder")[i]).style.display="none";
      }
    }
    
  }
  
}
