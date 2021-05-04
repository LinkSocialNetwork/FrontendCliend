import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { User } from 'src/app/shared/model/User';
import { LoginService } from 'src/app/shared/services/login.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("NavbarComponent")
  navBar: NavbarComponent;

  appCom;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {

    this.loginService.getLoggedInUser().subscribe(
      data =>{
        // info=data;
        
        if(data==null){
          this.router.navigate(['/login']);
        }

      }
    )

    //this.loginService.logoutUser().subscribe();
  }

  following: User[] = [];
  udpateFollowingList(e): void{
    this.following = e;
    console.log(this.following);
  }

  refreshNavbar(): void{
    console.log("Refresh reached home");
    this.navBar.ngOnInit();
  }

}
