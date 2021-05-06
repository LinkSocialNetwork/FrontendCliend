import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
{path: 'login', component:LoginComponent},
{path: 'home', component:HomeComponent},
{path: 'profile/:id', component:ProfileComponent},
{path: 'chatroom', component: ChatComponent},
{path: 'search', component: SearchComponent},
{path:'',redirectTo:'login',pathMatch:'full'},
{path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
