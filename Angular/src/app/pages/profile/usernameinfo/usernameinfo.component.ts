import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usernameinfo',
  templateUrl: './usernameinfo.component.html',
  styleUrls: ['./usernameinfo.component.css']
})
export class UsernameinfoComponent implements OnInit {


  @Input()
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  /* update user */
  updateUser(){
    this.userService.updateUser(this.user).subscribe(
      response =>{
        if(response === true)
          Swal.fire({ icon: 'success', title: 'Done', timer: 4000, showConfirmButton: true });
        else
          Swal.fire({ icon: 'warning', title: 'Username or Email already taken', timer: 4000, showConfirmButton: true });
        
        this.ngOnInit();
      }
    );
  }

}
