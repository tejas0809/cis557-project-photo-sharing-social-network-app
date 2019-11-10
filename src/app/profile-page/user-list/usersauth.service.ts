import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable()
export class UsersAuthService {
  private token: string;
  private tokenTimer: any;
  private isUserAuth = false;
  private userAuthStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string, fname: string, lname: string, dob: string, gender: string,
             country: string, city: string, bio: string, profileimage: File) {
              const userData = new FormData();
              const profFileName = email + 'profile';

              userData.append('email', email);
              userData.append('password', password);
              userData.append('fname', fname);
              userData.append('lname', lname);
              userData.append('dob', dob);
              userData.append('gender', gender);
              userData.append('country', country);
              userData.append('city', city);
              userData.append('bio', bio);

            //   const userData = {
            //     email,
            //     password,
            //     fname,
            //     lname,
            //     dob,
            //     gender,
            //     country,
            //     city,
            //     bio
            // };

              if (profileimage) {
                userData.append('profileimage', profileimage, profFileName);
              } else {
                userData.append('profileimage', '');
              }

              console.log('User');
              console.log(userData);

              this.http
              .post<{ message: string; post: User }>(
                'http://localhost:3000/api/user/signup',
                userData
              )
              .subscribe(res => {
                if (res.message === 'success'){
                  this.router.navigate(['/login']);
                }
              });
             }

  login(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(res => {
        this.token = res.token;
        if (this.token) {
          const expireDuration = res.expiresIn;
          this.setUserAuthTimer(expireDuration);
          this.isUserAuth = true;
          this.userAuthStatusListener.next(true);
          const curr = new Date();
          const expirationDate = new Date(curr.getTime() + expireDuration * 1000);
          this.saveUserAuthData(this.token, expirationDate);
        }

      });
  }

  logout() {
    this.token = null;
    this.isUserAuth = false;
    this.userAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearUserAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthenticateUser() {
    const authInfo = this.getUserAuthData();
    if(! authInfo){
      return;
    }

    const curr = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - curr.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isUserAuth =  true;
      this.setUserAuthTimer(expiresIn / 1000);
      this.userAuthStatusListener.next(true);
      this.router.navigate(['/profile']);
    }
  }

  getToken(){
    return this.token;
  }

  getIsUserAuth(){
    return this.isUserAuth;
  }

  getUserAuthStatusListener(){
    return this.userAuthStatusListener.asObservable();
  }

  private setUserAuthTimer(expireDuration){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expireDuration * 1000);
  }

  private saveUserAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearUserAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getUserAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
