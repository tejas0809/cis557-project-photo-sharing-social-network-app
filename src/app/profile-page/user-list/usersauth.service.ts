import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';

@Injectable()
export class UsersAuthService {
  private token: string;
  private tokenTimer: any;
  private isUserAuth = false;
  private userEmail: string;
  private userAuthStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private userService: UsersService) {}

  createUser(email: string, password: string, fname: string, lname: string, dob: string, gender: string,
             country: string, city: string, bio: string) {
              // const userData = new FormData();
              const profFileName = email + 'profile';

              // userData.append('email', email);
              // userData.append('password', password);
              // userData.append('fname', fname);
              // userData.append('lname', lname);
              // userData.append('dob', dob);
              // userData.append('gender', gender);
              // userData.append('country', country);
              // userData.append('city', city);
              // userData.append('bio', bio);

              const userData = {
                email,
                password,
                fname,
                lname,
                dob,
                gender,
                country,
                city,
                bio
            };

              // if (profileimage) {
              //   userData.append('profileimage', profileimage, profFileName);
              // } else {
              //   userData.append('profileimage', '');
              // }

              console.log('User');
              console.log(userData);

              this.http
              .post<{ message: string, user: any }>(
                'http://localhost:3000/api/user/signup',
                userData
              )
              .subscribe(res => {
                if (res.message === 'success') {
                  const newUser: User = {
                    email: res.user.email,
                    fname: res.user.fname,
                    lname: res.user.lname,
                    dob: res.user.dob,
                    gender: res.user.gender,
                    country: res.user.country,
                    city: res.user.city,
                    bio: res.user.bio,
                    profileimagePath: res.user.profileImagepath,
                    coverimagePath: res.user.coverImagePath
                  };
                  this.userService.addUser(newUser);
                  this.router.navigate(['/login']);
                }
              });
             }

  login(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.http
      .post<{ token: string; expiresIn: number, email: string }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(res => {
        this.token = res.token;
        console.log(res);
        if (this.token) {
          const expireDuration = res.expiresIn;
          this.setUserAuthTimer(expireDuration);
          this.isUserAuth = true;
          this.userAuthStatusListener.next(true);
          this.userEmail = res.email;
          const curr = new Date();
          const expirationDate = new Date(curr.getTime() + expireDuration * 1000);
          this.saveUserAuthData(this.token, expirationDate, this.userEmail);
          this.router.navigate(['/profile']);
        }

      });
  }

  logout() {
    this.token = null;
    this.isUserAuth = false;
    this.userAuthStatusListener.next(false);
    this.userEmail = null;
    clearTimeout(this.tokenTimer);
    this.clearUserAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthenticateUser() {
    const authInfo = this.getUserAuthData();
    if (! authInfo) {
      return;
    }

    const curr = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - curr.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isUserAuth =  true;
      this.userEmail = authInfo.email;
      this.setUserAuthTimer(expiresIn / 1000);
      this.userAuthStatusListener.next(true);
      // this.router.navigate(['/profile']);
    }
  }

  getToken() {
    return this.token;
  }

  getUserEmail() {
    return this.userEmail;
  }

  getIsUserAuth() {
    return this.isUserAuth;
  }

  getUserAuthStatusListener() {
    return this.userAuthStatusListener.asObservable();
  }

  private setUserAuthTimer(expireDuration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expireDuration * 1000);
  }

  private saveUserAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email', email);
  }

  private clearUserAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  private getUserAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userInfo = localStorage.getItem('email');
    if (!token || !expirationDate || !userInfo) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      email: userInfo
    };
  }
}
