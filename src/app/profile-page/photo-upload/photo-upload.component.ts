import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhotosService } from './photo.service';
import { mimeType } from './mime-type-validator';
import { FollowingService } from '../following/following.service';
import { UsersAuthService } from '../user-list/usersauth.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../user-list/users.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})

export class PhotoUploadComponent implements OnInit {
  userPhotos: FormGroup;
  ImagePreview: string;
  showContent = false;
  userEmail: string;
  isUserAuthenticated: boolean;
  userAuthSub: Subscription;
  userSub: Subscription;
  users: any[] = [];

  constructor(public photoService: PhotosService, public authUserService: UsersAuthService, private userService: UsersService) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();
    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });

    this.userPhotos = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      caption: new FormControl(null, {
        validators: []
      })
    });

    this.userService.getUsers();

    this.userSub = this.userService.getUserUpdatedlistener()
    .subscribe((res) => {
      this.users = res;
    });
  }

  onSelectImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userPhotos.patchValue({ image: file });
    this.userPhotos.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.ImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.showContent = true;
  }

  uploadImage() {
    if ( this.userPhotos.invalid ) {
      return;
    }
    // console.log(this.userPhotos);
    this.photoService.addPhoto(this.userPhotos.value.image, this.userPhotos.value.caption);
    this.userPhotos.reset();
    this.ImagePreview = null;
  }
}
