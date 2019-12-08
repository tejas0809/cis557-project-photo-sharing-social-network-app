import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersAuthService } from '../profile-page/user-list/usersauth.service';
import { UsersService } from '../profile-page/user-list/users.service';
import { User } from '../profile-page/user-list/user.model';
import { Subscription } from 'rxjs';
import { mimeType } from '../profile-page/photo-upload/mime-type-validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{
  userEmail: string;
  userInfo: User;

  isUserAuthenticated = false;
  profileshowContent = false;
  covershowContent = false;

  userAuthSub: Subscription;
  profileImagePreview: string;
  coverImagePreview: string;
  nrSelect: any;

  form: FormGroup;
  profileForm: FormGroup;
  coverForm: FormGroup;

  constructor(public authUserService: UsersAuthService, private userService: UsersService ) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();
    this.userService.getUser(this.userEmail).subscribe(userData => {
      this.userInfo = userData.user;
      this.form.get('gender').setValue(this.userInfo.gender);

      this.form.get('fname').setValue(this.userInfo.fname);
      this.form.get('lname').setValue(this.userInfo.lname);
      this.form.get('country').setValue(this.userInfo.country);
      this.form.get('dob').setValue(this.userInfo.dob);
      this.form.get('city').setValue(this.userInfo.city);
      this.form.get('bio').setValue(this.userInfo.bio);
    });

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });
    this.form = new FormGroup({
      fname: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: [Validators.required]
      }),
      lname: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: [Validators.required]
      }),
      dob: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: []
      }),
      gender: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: []
      }),
      country: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: []
      }),
      city: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: []
      }),
      bio: new FormControl({
        value: '',
        disabled: true
      }, {
        validators: []
      })
    });

    this.profileForm = new FormGroup({
      profileimage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.coverForm = new FormGroup({
      coverimage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
  onEditProfile(event: Event) {

    // Referred From https://stackoverflow.com/questions/42235156/angular-2-iterate-over-reactive-form-controls/50992362
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].enable();
      });
  }


  onSelectProfileImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ profileimage: file });
    this.profileForm.get('profileimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.profileshowContent = true;
  }

  onSelectCoverImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.coverForm.patchValue({ coverimage: file });
    this.coverForm.get('coverimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.covershowContent = true;
  }

  onSaveProfile(){
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].disable();
    });

    this.userService.editUser(this.userEmail, this.form.value.fname, this.form.value.lname, this.form.value.dob,
            this.form.value.gender, this.form.value.country, this.form.value.city, this.form.value.bio);
  }

  uploadProfileImage() {
    if ( this.profileForm.invalid ) {
      return;
    }

    this.userService.editProfilePhoto(this.userEmail, this.profileForm.value.profileimage);
    this.profileForm.reset();
    this.profileImagePreview = null;
  }

  uploadCoverImage() {
    if ( this.coverForm.invalid ) {
      return;
    }

    this.userService.editCoverPhoto(this.userEmail, this.coverForm.value.coverimage);
    this.coverForm.reset();
    this.coverImagePreview = null;
  }
}
