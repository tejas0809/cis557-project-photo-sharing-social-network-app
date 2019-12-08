import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersAuthService } from '../user-list/usersauth.service';
import { FollowersService } from '../followers/followers.service';
import { FollowingService } from './following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})

export class FollowingComponent implements OnInit{
  userEmail: string;
  userAuthSub: Subscription;
  isUserAuthenticated: boolean;
  followingSub: Subscription;
  followings: any[] = [];

  constructor(public authUserService: UsersAuthService, private followingService: FollowingService) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });
    this.followingService.getFollowing(this.userEmail);

    this.followingSub = this.followingService.getFollowingListener()
    .subscribe((following) => {
      this.followings = following;
    });
  }

  // unfollowUser(event: Event, email: string) {
  //   const buttonVal = event.target as HTMLInputElement;
  //   console.log('Button Val:', buttonVal.innerHTML);
  //   if ( buttonVal.innerHTML === 'FOLLOW') {
  //     buttonVal.innerHTML = 'UNFOLLOW';
  //     buttonVal.style.color = 'red';
  //     this.followingService.followUser(this.userEmail, email);
  //   } else if (buttonVal.innerHTML === 'UNFOLLOW') {
  //     buttonVal.innerHTML = 'FOLLOW';
  //     buttonVal.style.color = 'indigo';
  //     this.followingService.unfollowUser(this.userEmail, email);
  //   }
  // }
}
