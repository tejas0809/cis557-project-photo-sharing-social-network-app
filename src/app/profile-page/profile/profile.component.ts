import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user-list/user.model';
import { UsersAuthService } from '../user-list/usersauth.service';
import { UsersService } from '../user-list/users.service';
import { Photo } from '../photo-upload/photo.model';
import { PhotosService } from '../photo-upload/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  userEmail: string;
  userInfo: User;
  userAuthSub: Subscription;
  postSub: Subscription;
  isUserAuthenticated = false;
  posts: Photo[] = [];

  constructor(public authUserService: UsersAuthService, private userService: UsersService, private photoService: PhotosService ) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();
    this.userService.getUser(this.userEmail).subscribe(userData => {
      this.userInfo = userData.user;
    });

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });

    this.photoService.getPhotos(this.userEmail);
    this.postSub = this.photoService.getPhotoUpdateListener()
    .subscribe((posts: Photo[]) => {
      this.posts = posts;
    });
  }
}
