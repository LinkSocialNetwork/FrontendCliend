import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit, OnChanges {
  //================================================= INPUT ====================================================//

  @Input()
  users: User[];

  @Input()
  selectedUser: User;

  @Input()
  currentUser: User;

  @Input()
  searchForm = this.formBuilder.group({
    userName: '',
  });

  //================================================== VARIABLES ==================================================//

  isFollowing: boolean = true;

  //-============================================== CONSTRUCTOR / HOOKS =============================================//

  constructor(
    private formBuilder: FormBuilder,
    private userServe: UserService
  ) {}

  ngOnInit(): void {
    this.selectUser();
  }

  ngOnChanges(): void {
    this.selectUser();
  }

  //-=============================================== METHODS ====================================================//

  toggleFollowing(bool: boolean) {
    this.isFollowing = !this.isFollowing;
  }

  //---------------------------------------------------------------------------------------------------------------//

  selectUser() {
    //verify user is following selected user
    this.userServe.getFollowers(this.selectedUser.userID).subscribe((data) => {
      let found = data.find(
        (element) => element.userID === this.currentUser.userID
      );
      if (found) this.isFollowing = true;
      else this.isFollowing = false;
    });
  }

  //---------------------------------------------------------------------------------------------------------------//

}
