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
    .get<{message: string, photos: any, users: any}>('http://localhost:3000/api/user/activityfeed' + email)
    .pipe(
      map(photoData => {
        return photoData.photos.map(photo => {
          return {
            userEmail: photo.users.email,
            fname: photo.users.fname,
            lname: photo.users.lname,
            profileImagePath: photo.users.profileimagePath,
            imagePath: photo.imagePath,
            caption: photo.caption,
            id: photo.id
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

}
