import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserInfoComponent } from './pages/home/user-info/user-info.component';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SearchComponent } from './pages/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './shared/pipes/safe.pipe';
import { LoginService } from './shared/services/login.service';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { FollowButtonComponent } from './shared/components/buttons/follow-button/follow-button.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UnfollowButtonComponent } from './shared/components/buttons/unfollow-button/unfollow-button.component';
import { PostComponent } from './shared/components/post/post.component';
import { FeedComponent } from './shared/components/feed/feed.component';
import { UsergeneralinfoComponent } from './pages/profile/usergeneralinfo/usergeneralinfo.component';
import { UserpasswordinfoComponent } from './pages/profile/userpasswordinfo/userpasswordinfo.component';
import { UsernameinfoComponent } from './pages/profile/usernameinfo/usernameinfo.component';
import { FollowComponent } from './pages/follow/follow.component';
import { FollowingComponent } from './pages/follow/following/following.component';
import { FollowerComponent } from './pages/follow/follower/follower.component';
import { AddPostComponent } from './shared/components/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserInfoComponent,
    ProfileComponent,
    ChatComponent,
    SearchComponent,
    SafePipe,
    NotificationComponent,
    FollowButtonComponent,
    NavbarComponent,
    UnfollowButtonComponent,
    PostComponent,
    FeedComponent,
    UsergeneralinfoComponent,
    UserpasswordinfoComponent,
    UsernameinfoComponent,
    FollowComponent,
    FollowingComponent,
    FollowerComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
