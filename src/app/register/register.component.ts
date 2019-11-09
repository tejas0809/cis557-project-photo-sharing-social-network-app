import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersAuthService } from '../profile-page/user-list/usersauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  // Three Form Groups for each register step
  userCredentials: FormGroup;
  personalDetails: FormGroup;
  userPhotos: FormGroup;

  // To create image preview of profile and cover photo
  profileImagePreview: string;
  coverImagePreview: string;

  // Password requirements parameters
  minPasswordLength = 5;
  maxPasswordLength = 40;

  // Password hide or display logic
  hide = true;

  // Sign me Up disables when checkbox is not marked
  disabled = false;

  // Used for confirm password validator
  matcher = new MyErrorStateMatcher();

  constructor(public authUserService: UsersAuthService) {}

  ngOnInit() {
    this.userCredentials = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(this.minPasswordLength), Validators.maxLength(this.maxPasswordLength)]
      }),
      confirmpassword: new FormControl('', {
        validators: [Validators.required]
      })
    },
    this.checkPassword
    );


    this.personalDetails = new FormGroup({
      fname: new FormControl('', {
        validators: [Validators.required]
      }),
      lname: new FormControl('', {
        validators: [Validators.required]
      }),
      dob: new FormControl(null, {
        validators: []
      }),
      gender: new FormControl(null, {
        validators: []
      }),
      country: new FormControl(null, {
        validators: []
      }),
      city: new FormControl(null, {
        validators: []
      }),
      bio: new FormControl(null, {
        validators: []
      })
    });

    this.userPhotos = new FormGroup({
      profileimage: new FormControl(null, {
        validators: []
      }),
      coverimage: new FormControl(null, {
        validators: []
      })
    });
  }

  onSelectProfileImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userPhotos.patchValue({ profileimage: file });
    this.userPhotos.get('profileimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSelectCoverImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userPhotos.patchValue({ coverimage: file });
    this.userPhotos.get('coverimage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.coverImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  checkPassword(group: FormGroup) {

    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmpassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  getPasswordErrorMessage() {
    return this.userCredentials.controls.password.hasError('required') ? 'You must enter a password' :
        this.userCredentials.controls.password.hasError('minlength') ?
        'Your password must be of minimum ' + this.minPasswordLength + ' characters' :
        this.userCredentials.controls.password.hasError('maxlength') ?
        'Your password should not exceed ' + this.maxPasswordLength + ' characters' :
        '';
  }

  getEmailErrorMessage() {
    return this.userCredentials.controls.email.hasError('required') ? 'You must enter a email' :
        this.userCredentials.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  submitForm() {
    if (this.userCredentials.invalid || this.personalDetails.invalid || this.userPhotos.invalid) {
      return;
    }

    this.authUserService.createUser(this.userCredentials.value.email, this.userCredentials.value.password,
      this.personalDetails.value.fname, this.personalDetails.value.lname, this.personalDetails.value.dob,
      this.personalDetails.value.gender, this.personalDetails.value.country, this.personalDetails.value.city,
      this.personalDetails.value.bio, this.userPhotos.value.profileimage, this.userPhotos.value.coverimage);

    console.log('submitted');
  }
}

// Referred from https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
