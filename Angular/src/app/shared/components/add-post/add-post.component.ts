import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Post } from 'src/app/shared/model/Post';
import { User } from 'src/app/shared/model/User';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { PostService } from 'src/app/shared/services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {

  //================================================= INPUT ====================================================//

  @Input()
  following: User[] = [];

  //================================================== OUTPUT ==================================================//

  @Output()
  refreshNav: EventEmitter<void> = new EventEmitter();

  @Output()
  refreshFeed: EventEmitter<void> = new EventEmitter();

  //================================================== VARIABLES ==================================================//

  currentUser: User;
  postContrnt: string = null;
  youtubeUrl: string = null;
  postimg: string = null;
  postImage: File = null;
  imageURL: string;

  //-============================================== CONSTRUCTOR / HOOKS =============================================//

  constructor(
    private postservice: PostService,
    private imageServ: ImageUploadService,
    private getUserService: GetUserService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  //-=============================================== METHODS ====================================================//

  handleFileInput(files: FileList) {
    this.postImage = files.item(0);
  }

  //---------------------------------------------------------------------------------------------------------------//

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.postImage = file;
  }

  //---------------------------------------------------------------------------------------------------------------//

  addPost() {
    if (this.postContrnt.length < 5) {
      Swal.fire({
        icon: 'warning',
        title: 'You need to add more than one or two words',
        timer: 8000,
        showConfirmButton: true,
      });
      return;
    }
    if (this.youtubeUrl != null) {
      if (
        this.youtubeUrl.startsWith('https:') ||
        this.youtubeUrl.startsWith('www.') ||
        this.youtubeUrl.length != 11
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Please enter a valid youtube video ID ',
          timer: 8000,
          showConfirmButton: true,
        });
        return;
      }
    }
    Swal.fire({
      title: 'Creating the post',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 4000,
      onOpen: () => {
        Swal.showLoading();
      },
    });
    let post: Post = {
      postId: 0,
      user: this.currentUser,
      postTitle: 'New Post',
      postContent: this.postContrnt,
      postImageUrl: null,
      youtubeUrl:
        this.youtubeUrl != null
          ? 'https://www.youtube.com/embed/' + this.youtubeUrl
          : null,
      usersWhoLiked: [],
      comments: [],
      postedAt: <string>(<unknown>new Date().getTime()),
    };
    if (this.postImage != null) {
      let file: FormData = new FormData();
      file.append('file', this.postImage);
      this.imageServ.postImageUpload(file).subscribe((data) => {
        post.postImageUrl = data.message;
        this.postservice.insertNewPost(post).subscribe((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Created',
            timer: 4000,
            showConfirmButton: true,
          });
          this.refreshFeed.emit();
          this.postImage = null;
          this.postContrnt = null;
          this.youtubeUrl = null;
          this.postimg = null;
          this.imageURL = null;
        });
      });
    } else {
      this.postservice.insertNewPost(post).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Created',
          timer: 4000,
          showConfirmButton: true,
        });
        this.refreshFeed.emit();
        this.postImage = null;
        this.postContrnt = null;
        this.youtubeUrl = null;
        this.postimg = null;
      });
    }
  }

  //---------------------------------------------------------------------------------------------------------------//

  refreshNavbar(): void {
    this.refreshNav.emit();
  }

  //---------------------------------------------------------------------------------------------------------------//

}
