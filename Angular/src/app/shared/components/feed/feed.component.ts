import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Post } from '../../model/Post';
import { User } from '../../model/User';
import { GetPostService } from '../../services/get-post.service';
import { GetUserService } from '../../services/get-user.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  posts:Post[];

  @Input()
  currentUser:User;

  @Input()
  profileUser: User;

  @Input()
  notSpecificUser:boolean = false;

  @Input()
  feedTitle: string;

  @Output()
  refreshNav: EventEmitter<void> = new EventEmitter();

  page:number = 0;

  flag: boolean = false;

  constructor(private getPostService:GetPostService,private getUserService:GetUserService) { }

  ngOnInit(): void {
    console.log("in onInit")
    this.page = 0;
    this.posts = [];
    this.getUserService.getCurrentUser().subscribe(
      data=>{
        this.currentUser=data;
        this.resetPage();
      })
  }

  ngOnChanges():void {
    // this.resetPage();
    console.log("in onChanges")
    // this.page = 0;
    // this.posts = [];
  }

  ngOnDestroy(): void {
    this.page = 0;
    this.posts = [];
  }

  //---------------------------------------------------------------------------------------------------------------//

  /**
   * this will make a request to get more posts when reach bottom of page
   */
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if(pos == max )   {
      //Do your action here
      if (this.flag){
        console.log("in scroll")
        this.addPage()
      }
    }
  }

//---------------------------------------------------------------------------------------------------------------//

  /**
   * this will make the request to get more posts
   */
  addPage() {
    this.page += 1;
    if (this.notSpecificUser){
      this.getSpecificUserPosts()
    } else {
      this.getFollowingPosts();
    }
  }

//---------------------------------------------------------------------------------------------------------------//

  /**
   * this will reset the list of posts (refresh)
   */
  resetPage() {
    this.posts = [];
    this.page = 0;
    if (this.notSpecificUser){
      this.getSpecificUserPosts()
    } else {
      this.getFollowingPosts();
    }
    this.flag = true;
  }

//---------------------------------------------------------------------------------------------------------------//

  /**
   * this will make the request to the back-end to get posts (used in addPage() and resetPage())
   */
  getFollowingPosts():void{
    if(this.currentUser===undefined){
      return;
    }
    this.getPostService.getUsersFollowingPosts(this.currentUser.userID,this.page).subscribe(
      data =>{
        let newPosts:Post[];
        console.log("in get postssss",data)
        newPosts=data;
        newPosts.sort((a,b) => (a.postedAt > b.postedAt) ? -1 : ((b.postedAt > a.postedAt) ? 1 : 0))
        for (const post of newPosts) {
          this.posts.push(post);
        }
      }
    )
  }

  //---------------------------------------------------------------------------------------------------------------//

  getSpecificUserPosts():void{
    this.getPostService.getPostsCreatedByUser(this.profileUser.userID,this.page).subscribe(
      data =>{
        let newPosts: Post[];
        console.log("in get posts",data)
        newPosts=data;
        newPosts.sort((a,b) => (a.postedAt > b.postedAt) ? -1 : ((b.postedAt > a.postedAt) ? 1 : 0))
        for (const post of newPosts) {
          this.posts.push(post);
        }
      }
    )
  }

  //---------------------------------------------------------------------------------------------------------------//

  refreshNavbar(): void{
    this.refreshNav.emit();
  }

  //---------------------------------------------------------------------------------------------------------------//

  goToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  //---------------------------------------------------------------------------------------------------------------//

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
