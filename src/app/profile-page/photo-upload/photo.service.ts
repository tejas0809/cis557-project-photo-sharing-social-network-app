import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersAuthService } from '../user-list/usersauth.service';
import { map } from 'rxjs/operators';
import { Photo } from './photo.model';
import { Subject } from 'rxjs';

@Injectable()
export class PhotosService {
  private photos: Photo[] = [];
  private photoUpdated = new Subject<Photo[]>();

  constructor(private http: HttpClient, private authService: UsersAuthService) {}

  getPhotos(email: string) {
    this.http
    .get<{message: string, photos: any}>('/api/post/user/' + email)
    .pipe(
      map(photoData => {
        return photoData.photos.map(photo => {
          return {
            imagePath: photo.imagePath,
            caption: photo.caption,
            id: photo.id,
            userEmail: photo.email
          };
        });
      })
    ).subscribe(updatedPost => {
      this.photos = updatedPost;
      this.photoUpdated.next([...this.photos]);
    });
  }

  addPhoto(image: File, caption: string) {
    const photoData = new FormData();
    const userEmail = this.authService.getUserEmail();
    console.log('image', image);
    photoData.append('image', image, userEmail);
    if (!caption) {
      caption = '';
    }
    photoData.append('caption', caption);

    this.http
    .post<{ message: string, post: any, id: number}>(
      '/api/post/user/' + userEmail,
      photoData
    )
    .subscribe( res => {
      console.log('Response: ', res);
      const newpost: Photo = {
        id: res.id,
        imagePath: res.post.imagePath,
        caption: res.post.caption,
        userEmail: res.post.email
      };
      this.photos.push(newpost);
      this.photoUpdated.next([...this.photos]);
    });
  }

  getPhotoUpdateListener() {
    return this.photoUpdated.asObservable();
  }

  editPhoto(postid: number, caption: string) {
    console.log('PostId:', postid, 'Caption', caption);

    const captionBody = {caption};
    this.http
    .put<{message: string}>(
      '/api/post/' + postid,
      captionBody
    ).subscribe( res => {
      if (res.message === 'success') {
        console.log('Post Updated Successfully');
      }
    });
  }

  deletePhoto(postid: number) {
    return this.http.delete('/api/post/' + postid);
  }

}
