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
    .get<{message: string, users: any}>('http:localhost:3000/api/user/following' + email)
    .pipe(
      map(followingData => {
        return followingData.users.map(followng => {
          return {
            email: followng.email,
            fname: followng.fname,
            lname: followng.lname,
            dob: followng.dob,
            gender: followng.gender,
            country: followng.country,
            city: followng.city,
            bio: followng.bio,
            profileImagePath: followng.profileimagePath,
            coverImagePath: followng.coverImagePath
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
    ('http://localhost:3000/api/user/follow/' + email2,
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
    ('http://localhost:3000/api/user/unfollow/' + email1 + '&' + email2)
    .subscribe( res => {
      console.log('Unfollow:' + res);
      if (res.message === 'success') {
          console.log('UnFollowed User Successfully');
      }
    });
  }

  // getFollowingCount(email: string) {
  //   return this.http
  //   .get<{message: string, followerCount: number}>('http://localhost:3000/api/user/followingCount/' + email);
  // }
}
