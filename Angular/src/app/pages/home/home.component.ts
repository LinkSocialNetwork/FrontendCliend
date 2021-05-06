import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
        
        if(data==null){
          this.router.navigate(['/login']);
        }

      }
    )

  }

  following: User[] = [];
  udpateFollowingList(e): void{
    this.following = e;
  }

  refreshNavbar(): void{
    this.navBar.ngOnInit();
  }

}
