import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersAuthService } from '../user-list/usersauth.service';

@Injectable()
export class LikedPostsService {
  likedPost: any = [];

  constructor(private http: HttpClient) {}

  getLikedPosts(email: string) {
    this.http
    .get<{message: string, photos: any}>('http://localhost:3000/api/post/likedPosts' + email)
    .pipe(
      map(likeData => {
        return likeData.photos.map( likePost => {
          return {
            email: likePost.userEmail,
            fname: likePost.fname,
            lname: likePost.lname,
            id: likePost.post.id,
            profileImagePath: likePost.profileImagePath,
            imagePath: likePost.imagePath,
            caption: likePost.caption
          };
        });
      })
    ).subscribe(updatedlikePosts => {
      this.likedPost = updatedlikePosts;
    });
  }

  likePost(email: string, post: any) {
    this.http
    .post<{message: string, post: any}>(
      'http:/localhost:3000/api/post/like' + post.id,
      email
    )
    .subscribe(res => {
      if (res.message === 'success') {
        const newlikedPost = {
          email: post.userEmail,
          fname: post.fname,
          lname: post.lname,
          id: res.post.id,
          profileImagePath: post.profileImagePath,
          imagePath: post.imagePath,
          caption: post.caption
        };
        this.likedPost.push(newlikedPost);
      }
    });

  }

  unlikePost(email: string, post: any) {
    this.http
    .delete<{message: string}>(
      'http://localhost:3000/api/post/unlike/' + post.id + '/' + email
    )
    .subscribe(res => {
      if (res.message === 'success') {
        this.getLikedPosts(email);
      }
    });
  }
}
