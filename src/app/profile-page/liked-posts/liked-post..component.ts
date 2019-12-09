import { Component, OnInit } from '@angular/core';
import { LikedPostsService } from './liked-posts.service';
import { UsersAuthService } from '../user-list/usersauth.service';
import { Subscription } from 'rxjs';
import { ActivityFeedService } from '../activity-feed/activity-feed.service';
import { CommentsService } from '../comments/comments.services';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})

export class LikedPostComponent implements OnInit {

  userEmail: string;
  isUserAuthenticated: boolean;
  userAuthSub: Subscription;
  likeSub: Subscription;
  likedPost: any[] = [];

  constructor(private likedpostsService: LikedPostsService, public authUserService: UsersAuthService,
              private aFService: ActivityFeedService, public commentService: CommentsService) {}
  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });

    this.likedpostsService.getLikedPosts(this.userEmail);
    this.likeSub = this.likedpostsService.getlikedUpdatedListener()
    .subscribe((posts: any[]) => {
      this.likedPost = posts;
    });

  }

  unlikePost(event: Event, id: number) {
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

  viewComments(photos: any) {
    this.commentService.setUserInfo(photos);
  }
}
