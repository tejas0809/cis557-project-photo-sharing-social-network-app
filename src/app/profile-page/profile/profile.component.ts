import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user-list/user.model';
import { UsersAuthService } from '../user-list/usersauth.service';
import { UsersService } from '../user-list/users.service';
import { Photo } from '../photo-upload/photo.model';
import { PhotosService } from '../photo-upload/photo.service';
import { FollowersService } from '../followers/followers.service';
import { FollowingService } from '../following/following.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../comments/comments.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userEmail: string;
  userInfo: User;
  userAuthSub: Subscription;
  postSub: Subscription;
  editCaptionForm: FormGroup;
  isUserAuthenticated = false;
  posts: Photo[] = [];
  followerCount = 0;
  followingCount = 0;

  constructor(public authUserService: UsersAuthService, private userService: UsersService,
              private photoService: PhotosService, private followerService: FollowersService,
              private followingService: FollowingService, private commentService: CommentsService ) {}

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

    this.followerService.getFollowersCount(this.userEmail).subscribe( res => {
      if (res.message === 'success') {
        this.followerCount = res.followerCount;
      }
    });
    this.followingService.getFollowingCount(this.userEmail).subscribe(res => {
      this.followingCount = res.followingCount;
    });

    this.editCaptionForm = new FormGroup({
      caption: new FormControl(null, {
        validators: []
      })
    });
  }

  showForm(postid: number, postcontent: string) {

    const idName: string = 'photo' + postid;
    const captionContentId = 'caption' + postid;
    const formContentId = 'formtext' + postid;
    const backButtonId = 'back' + postid;
    const editButtonId = 'edit' + postid;

    const formVisibility = document.getElementById(idName);
    formVisibility.classList.remove('hide-form');
    let captionContent;

    const captionEle = document.getElementById(captionContentId);
    if (captionEle) {
      captionContent = captionEle.innerHTML;
      captionEle.style.display = 'none';
    } else {
      captionContent = '';
    }

    const formText = document.getElementById(formContentId) as HTMLInputElement;
    console.log(formText);
    formText.value = captionContent;
    formText.focus();

    const backButton = document.getElementById(backButtonId);
    backButton.classList.remove('hide-form');

    const editButton = document.getElementById(editButtonId);

    editButton.style.display = 'none';
  }

  backForm(postid: number) {

    const editButtonId = 'edit' + postid;
    const captionContentId = 'caption' + postid;
    const idName = 'photo' + postid;
    const backButtonId = 'back' + postid;

    const editButton = document.getElementById(editButtonId);
    editButton.style.display = '';

    const captionEle = document.getElementById(captionContentId);
    captionEle.style.display = '';

    const formVisibility = document.getElementById(idName);
    formVisibility.classList.add('hide-form');

    const backButton = document.getElementById(backButtonId);
    // backButton.classList.remove('hide-form');

    backButton.classList.add('hide-form');
  }

  editForm(postid: number ) {
    const saveButtonId = 'save' + postid;
    const backButtonId = 'back' + postid;
    // console.log(saveButtonId);
    const saveButton = document.getElementById(saveButtonId);
    saveButton.classList.remove('hide-form');

    const backButton = document.getElementById(backButtonId);
    backButton.classList.add('hide-form');
  }

  saveForm(postid: number) {
    const saveButtonId = 'save' + postid;
    const formContentId = 'formtext' + postid;
    const editButtonId = 'edit' + postid;
    const captionContentId = 'caption' + postid;
    const idName = 'photo' + postid;

    const saveButton = document.getElementById(saveButtonId);
    saveButton.classList.add('hide-form');

    const editButton = document.getElementById(editButtonId);
    editButton.style.display = '';

    const captionEle = document.getElementById(captionContentId);

    if (this.editCaptionForm.invalid) {
      return;
    }

    const formText = document.getElementById(formContentId) as HTMLInputElement;
    const captionContent = formText.value;

    const formVisibility = document.getElementById(idName);
    formVisibility.classList.add('hide-form');

    captionEle.style.display = '';
    captionEle.innerHTML = captionContent;

    this.photoService.editPhoto(postid, captionContent);
  }

  onDelete(postId: number) {
    this.photoService.deletePhoto(postId).subscribe(() => {
      this.photoService.getPhotos(this.userEmail);
    });
  }

  viewComments(post: Photo) {
    const postInfo = {
      userEmail: this.userEmail,
      fname: this.userInfo.fname,
      lname: this.userInfo.lname,
      profileImagePath: this.userInfo.profileimagePath,
      imagePath: post.imagePath,
      caption: post.caption,
      id: post.id
    };

    this.commentService.setUserInfo(postInfo);
  }
}
