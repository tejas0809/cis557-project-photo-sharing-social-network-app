import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable()
export class UsersAuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string, fname: string, lname: string, dob: string, gender: string,
             country: string, city: string, bio: string, profileimage: File, coverimage: File) {
              const userData = new FormData();
              const profFileName = email + 'profile';
              const coverFileName = email + 'cover';

              userData.append('email', email);
              userData.append('password', password);
              userData.append('fname', fname);
              userData.append('lname', lname);
              userData.append('dob', dob);
              userData.append('gender', gender);
              userData.append('country', country);
              userData.append('city', city);
              userData.append('bio', bio);

              if (profileimage) {
                userData.append('profileimage', profileimage, profFileName);
              } else {
                userData.append('profileimage', '');
              }

              if (coverimage) {
                userData.append('coverimage', coverimage, coverFileName);
              } else {
                userData.append('coverimage', '');
              }

              this.http
              .post<{ message: string; post: User }>(
                'http://localhost:3000/api/posts',
                userData
              )
              .subscribe(res => {
                // this.router.navigate(['/login']);
                console.log(res);
              });
             }

  login(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {
        console.log(response);
      });
  }

}
