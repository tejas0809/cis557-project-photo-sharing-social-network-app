import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private userUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
    .get<{message: string, users: any}>('http://localhost:3000/api/user')
    .pipe(
      map(userData => {
        return userData.users.map(user => {
          return {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            dob: user.dob,
            gender: user.gender,
            country: user.country,
            city: user.city,
            bio: user.bio,
            profileimagePath: user.profileimagePath,
            coverimagePath: user.coverimagePath
          };
        });
      })
    ).subscribe(updatedUser => {
      this.users = updatedUser;
      this.userUpdated.next([...this.users]);
    });
  }

  getUser(email: string) {

   return this.http.get<{
      user: User
    }>('http://localhost:3000/api/user/' + email);
  }

  addUser(user: User) {
    this.users.push(user);
    this.userUpdated.next([...this.users]);
  }

  getUserUpdatedlistener() {
    return this.userUpdated.asObservable();
  }

  editUser(email: string, fname: string, lname: string, dob: Date, gender: string, country: string, city: string, bio: string) {
      // console.log(fname,':', lname,':', dob,':',gender,':', country,':',city,':',bio)

      let dobnew = null;
      if (dob) {
        const format = 'yyyy-MM-dd';
        const locale = 'en-US';
        dobnew = formatDate(dob, format, locale);
      }
      const userData = {
        fname,
        lname,
        dob: dobnew,
        gender,
        country,
        city,
        bio
      };

      this.http
      .put<{message: string}>('http://localhost:3000/api/user/' + email, userData)
      .subscribe( res => {
        if (res.message === 'success') {
          console.log('User Edited Successfully');
        }
      });
  }

  editProfilePhoto(email: string, profileImage: File) {
    const profilePhotoData = new FormData();
    profilePhotoData.append('profileimage', profileImage, email);

    this.http
    .put<{message: string}>('http://localhost:3000/api/user/editProfile/' + email, profilePhotoData)
    .subscribe( res => {
      if (res.message === 'success'){
        console.log('Profile Photo Edited');
      }
    });
  }

  editCoverPhoto(email: string, coverImage: File) {
    const coverPhotoData = new FormData();
    coverPhotoData.append('coverimage', coverImage, email);

    this.http
    .put<{message: string}>('http://localhost:3000/api/user/editCover/' + email, coverPhotoData)
    .subscribe( res => {
      if (res.message === 'success') {
        console.log('Cover Photo Updated');
      }
    });

  }
}
