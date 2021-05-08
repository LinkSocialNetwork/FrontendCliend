import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { FollowComponent } from './pages/follow/follow.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';


const routes: Routes = [
{path: 'login', component:LoginComponent},
{path: 'home', component:HomeComponent},
{path: 'profile/:id', component:ProfileComponent},
{path: 'chatroom', component: ChatComponent},
{path: 'search', component: SearchComponent},
{path: 'follow/:followType', component: FollowComponent},
{path: 'post/:id', component:ViewPostComponent},
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
