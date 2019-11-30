import { Injectable } from '@angular/core';
import { User } from '../user-list/user.model';
import { HttpClient } from '@angular/common/http';
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
}
