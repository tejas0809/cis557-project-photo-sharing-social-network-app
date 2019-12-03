import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FollowersService {

  constructor(private http: HttpClient) {}

  getFollowers(email: string) {
    return this.http
    .get<{message: string, users: any}>('http://localhost:3000/api/user/followers/' + email);
  }

  getFollowersCount(email: string) {
    return this.http
    .get<{message: string, followerCount: number}>('http://localhost:3000/api/user/followersCount/' + email);
  }
}
