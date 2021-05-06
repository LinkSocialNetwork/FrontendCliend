import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userpasswordinfo',
  templateUrl: './userpasswordinfo.component.html',
  styleUrls: ['./userpasswordinfo.component.css']
})
export class UserpasswordinfoComponent implements OnInit {

  @Input()
  user:User;

  newPassword1:string = '';
  newPassword2:string = '';
  oldPassword:string = '';

  constructor(private userService: UserService) { }


  updatePassword(){
    //form validation
    if(this.newPassword1 != this.newPassword2 || this.newPassword1.length==0) {
      Swal.fire({ icon: 'warning', title: "Passwords do not match", timer: 4000, showConfirmButton: true });
    }
    else {
      // If the entered in current password value is not what's in the db,
      // we don't update anything
      this.user.password = this.oldPassword;
      this.userService.checkOldPass(this.user, this.oldPassword,this.newPassword1).subscribe(data => {
        if(data === true){
          this.user.password = this.newPassword1;
          Swal.fire({ icon: 'success', title: "Password has been updated", timer: 4000, showConfirmButton: true });
        }else{
          Swal.fire({ icon: 'warning', title: "Incorrect Old Password", timer: 4000, showConfirmButton: true });
        }
      })
    }
  }
}
