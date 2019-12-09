import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user.model';
import { UsersAuthService } from '../user-list/usersauth.service';
import { UsersService } from '../user-list/users.service';
import { Subscription } from 'rxjs';
import { FollowingService } from '../following/following.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})

export class ExploreComponent implements OnInit {
  userEmail: string;
  otherUsers: User[] = [];
  userAuthSub: Subscription;
  userSub: Subscription;
  isUserAuthenticated = false;

  constructor(public authUserService: UsersAuthService, private userService: UsersService, private followingService: FollowingService ) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });

    this.userService.exploreUsers(this.userEmail);
    this.userSub = this.userService.getUserUpdatedlistener()
    .subscribe((users: User[]) => {
      this.otherUsers = users.filter(item => item.email !== this.userEmail);
    });
  }

  followUser(event: Event, email: string) {
    const buttonVal = event.target as HTMLInputElement;
    console.log('Button Val:', buttonVal.innerHTML);
    if ( buttonVal.innerHTML === 'FOLLOW') {
      buttonVal.innerHTML = 'UNFOLLOW';
      buttonVal.style.color = 'red';
      this.followingService.followUser(this.userEmail, email);
    } else if (buttonVal.innerHTML === 'UNFOLLOW') {
      buttonVal.innerHTML = 'FOLLOW';
      buttonVal.style.color = 'indigo';
      this.followingService.unfollowUser(this.userEmail, email);
    }
  }
}
