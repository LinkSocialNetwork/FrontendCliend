import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetPostService } from 'src/app/shared/services/get-post.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('NavbarComponent')
  navBar: NavbarComponent;

  @ViewChild('feedComponent')
  feedComponent: FeedComponent;

  currentUser: User;
  posts: Post[] = [];
  following: User[] = [];
  theme: string = 'light';

  youtubeUrl: string = null;
  page: number = 0;
  postContrnt: string = null;
  postimg: string = null;
  postImage: File = null;
  imageURL: string;

  appCom;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private getPostService: GetPostService,
    private getUserService: GetUserService,
    public fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if(window.localStorage.getItem('theme')!=undefined){
      this.theme =window.localStorage.getItem('theme');
    }
    this.loginService.getLoggedInUser().subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/login']);
      }
    });
    this.getUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  udpateFollowingList(e): void {
    this.following = e;
  }

  scroll = (event): void => {
    const topButton = document.getElementById('topButton');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topButton.style.display = 'block';
    } else {
      topButton.style.display = 'none';
    }
  };

  goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  getAllPosts(): void {
    this.getPostService.getAllPosts().subscribe((data) => {
      let newPosts: Post[];
      newPosts = data;
      newPosts.sort((a, b) =>
        a.postedAt > b.postedAt ? -1 : b.postedAt > a.postedAt ? 1 : 0
      );
      this.posts = newPosts;
    });
  }

  getFollowingPosts(): void {
    this.getPostService
      .getUsersFollowingPosts(this.currentUser.userID, this.page)
      .subscribe((data) => {
        let newPosts: Post[];
        newPosts = data;
        newPosts.sort((a, b) =>
          a.postedAt > b.postedAt ? -1 : b.postedAt > a.postedAt ? 1 : 0
        );
        for (const post of newPosts) {
          this.posts.push(post);
        }
      });
  }

  toggleTheme(): void{
    if(this.theme==='light'){
      this.theme='dark';
      window.localStorage['theme'] = this.theme;
      return;
    }
    if(this.theme==='dark'){
      this.theme='light';
      window.localStorage['theme'] = this.theme;
      return;
    }
  }
}
