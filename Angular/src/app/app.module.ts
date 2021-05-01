import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TimeLineComponent } from './pages/home/time-line/time-line.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimeLineComponent,
    HomeComponent,
    UserInfoComponent,
    ProfileComponent,
    ChatComponent,
    SearchComponent,
    SafePipe,
    NotificationComponent,
    FollowButtonComponent,
    NavbarComponent,
    UnfollowButtonComponent
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
