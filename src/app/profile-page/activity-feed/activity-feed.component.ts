import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../user-list/usersauth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivityFeedService } from './activity-feed.service';


@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.css']
})

export class ActivityFeedComponent implements OnInit {
  photos: any = [];
  userEmail: string;
  userAuthSub: Subscription;
  photoSub: Subscription;
  isUserAuthenticated = false;
  likehidden = true;

  constructor(private http: HttpClient, private authService: UsersAuthService, private aFService: ActivityFeedService) {}

  ngOnInit() {
    this.userEmail = this.authService.getUserEmail();

    this.isUserAuthenticated = this.authService.getIsUserAuth();

    this.userAuthSub = this.authService
                      .getUserAuthStatusListener().subscribe(isAuthenticated => {
                        this.isUserAuthenticated = isAuthenticated;
                        this.userEmail = this.authService.getUserEmail();
                      });
    this.aFService.getActivityFeed(this.userEmail);
    this.photoSub = this.aFService
                    .getPhotoUpdatedListener()
                    .subscribe((photos: any) => {
                      this.photos = photos;
                    });
  }

  likePost(event: Event, id: number) {
    const buttonVal = event.target as HTMLInputElement;

    if (buttonVal.innerHTML === 'LIKE' ) {
      buttonVal.innerHTML = 'UNLIKE';
      buttonVal.style.color = 'red';
      this.aFService.likePost(this.userEmail, id);
    } else {
      buttonVal.innerHTML = 'LIKE';
      buttonVal.style.color = 'indigo';
      this.aFService.unlikePost(this.userEmail, id);
    }
  }
}
