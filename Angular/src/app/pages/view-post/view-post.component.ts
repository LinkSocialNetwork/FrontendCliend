import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetCookieService } from 'src/app/shared/services/get-cookie.service';
import { GetPostService } from 'src/app/shared/services/get-post.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {

  post: Post;

  currentUser: User;
  theme: string = 'light';

  constructor(
    private router: ActivatedRoute,
    private getPostServ: GetPostService,
    private getUserServ: GetUserService,
    private route: Router,
    private cookieService: GetCookieService

  ) {}

  ngOnInit(): void {

    let authtoken = this.cookieService.getCookie("token")
    if(!authtoken)
      this.route.navigate(['login'])
    
    this.getUserServ.getCurrentUser().subscribe(data2 => {
      this.currentUser=data2;
    });
    this.router.params.subscribe((params) => {
      this.getPostServ.getPostById( params['id']).subscribe(data => {
        this.post = data;
      });

    });
  }

  toggleTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
      window.localStorage['theme'] = this.theme;
      return;
    }
    if (this.theme === 'dark') {
      this.theme = 'light';
      window.localStorage['theme'] = this.theme;
      return;
    }
  }
}
