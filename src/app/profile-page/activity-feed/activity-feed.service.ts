import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class ActivityFeedService {

  constructor(private http: HttpClient) {}

  private photos: any;
  private photosUpdated = new Subject<any>();

  getActivityFeed(email: string) {
    this.http
    .get<{message: string, users: any}>('/api/user/activityfeed/' + email)
    .pipe(
      map(photoData => {
        return photoData.users.map(photo => {
          return {
            userEmail: photo.email,
            fname: photo.fname,
            lname: photo.lname,
            profileImagePath: photo.profileImagePath,
            imagePath: photo.imagePath,
            caption: photo.caption,
            id: photo.id,
            flag: photo.flag
          };
        });
      })
    ).subscribe(updatedPhoto => {
      this.photos = updatedPhoto;
      this.photosUpdated.next([... this.photos]);
    });
  }

  getPhotoUpdatedListener() {
    return this.photosUpdated.asObservable();
  }

  likePost(email: string, id: number) {
    const user = {email};
    this.http
    .post<{message: string}>
    ('/api/post/like/' + id,
    user)
    .subscribe( res => {
      console.log('Liked', res);
      if (res.message === 'success') {
        console.log('Liked Post Successfully');
      }
    });
  }

  unlikePost(email: string, id: number) {
    this.http
    .delete<{message: string}>
    ('/api/post/unlike/' + id + '&' + email)
    .subscribe( res => {
      console.log('Unliked', res);
      if (res.message === 'success') {
        console.log('UnLiked Post Successfully');
      }
    });
  }

}
