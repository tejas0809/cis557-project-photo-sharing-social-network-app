import { Injectable } from '@angular/core';
import { User } from '../user-list/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class FollowingService {
  private following: User[] = [];
  private followingUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getFollowing(email: string) {
    return this.http
    .get<{message: string, following: any}>('/api/user/following/' + email)
    .pipe(
      map(followingData => {
        return followingData.following.map(followng => {
          return {
            email: followng.email,
            fname: followng.fname,
            lname: followng.lname,
            profileImagePath: followng.profileImagePath
          };
      });
      })
    ).subscribe(updatedFollowing => {
      this.following = updatedFollowing,
      this.followingUpdated.next([... this.following]);
    });
  }

  followUser(email1: string, email2: string) {
    const user = {email: email1};
    this.http
    .post<{ message: string }>
    ('/api/user/follow/' + email2,
    user)
    .subscribe(res => {
      console.log('follow:' + res);
      if (res.message === 'success') {
        console.log('Followed User successfully');
      }
    });

  }

  unfollowUser(email1: string, email2: string) {

    const emails = {email1, email2};
    this.http
    .delete<{message: string}>
    ('/api/user/unfollow/' + email1 + '&' + email2)
    .subscribe( res => {
      console.log('Unfollow:' + res);
      if (res.message === 'success') {
          console.log('UnFollowed User Successfully');
      }
    });
  }

  getFollowingListener() {
    return this.followingUpdated.asObservable();
  }

  getFollowingCount(email: string) {
    return this.http
    .get<{message: string, followingCount: number}>('/api/user/followingCount/' + email);
  }
}
