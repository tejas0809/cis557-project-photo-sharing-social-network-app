import { Component, OnInit } from '@angular/core';
import { User } from '../user-list/user.model';
import { Subscription } from 'rxjs';
import { UsersAuthService } from '../user-list/usersauth.service';
import { FollowersService } from './followers.service';
import { map } from 'rxjs/operators';
import { FollowingService } from '../following/following.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})

export class FollowersComponent implements OnInit {
  userEmail: string;
  userAuthSub: Subscription;
  isUserAuthenticated: boolean;
  followers: any;

  constructor(public authUserService: UsersAuthService, private followerService: FollowersService,
              private followingService: FollowingService) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });

    this.followerService.getFollowers(this.userEmail).pipe(
      map( followerData => {
        return followerData.followers.map(follower => {
          return {
            email: follower.email,
            fname: follower.fname,
            lname: follower.lname,
            profileImagePath: follower.profileImagePath,
            flag: follower.flag
          };
        });
      })
    ).subscribe(updateFollower => {
      this.followers = updateFollower;
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
