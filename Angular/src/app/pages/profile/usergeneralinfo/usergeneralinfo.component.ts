import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usergeneralinfo',
  templateUrl: './usergeneralinfo.component.html',
  styleUrls: ['./usergeneralinfo.component.css'],
})
export class UsergeneralinfoComponent implements OnInit {
  @Input()
  user: User;

  // This will hold the updated profile pic file
  updatedImage: File = null;

  constructor(
    private imageServ: ImageUploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  // Basically a ngModel for the updatedImage field
  handleFileInput(files: FileList) {
    this.updatedImage = files.item(0);
  }

  /* checks if image exists */
  update() {
    // If there's a new image, upload it and set it to the user object
    if (this.updatedImage != null) {
      let file: FormData = new FormData();
      file.append('file', this.updatedImage);
      this.imageServ.imageUpload(file).subscribe((data) => {
        //Set it to the updated user
        this.user.profileImg = data.message;

        // This will update the user by sending the user object through the service
        this.updateUser();
      });
    } else {
      this.updateUser();
    }
  }

  /* update user */
  updateUser() {
    this.userService.updateUser(this.user).subscribe((response) => {
      if (response === true)
        Swal.fire({
          icon: 'success',
          title: 'Done',
          timer: 4000,
          showConfirmButton: true,
        });
      else
        Swal.fire({
          icon: 'warning',
          title: 'Username or Email already taken',
          timer: 4000,
          showConfirmButton: true,
        });

      this.ngOnInit();
    });
  }
}
