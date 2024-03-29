import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';
import { DatePipe, formatDate } from '@angular/common';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UsersAuthService {
  private token: string;
  private tokenTimer: any;
  private isUserAuth = false;
  private userEmail: string;
  private userAuthStatusListener = new Subject<boolean>();
  private loginAllow: any;

  constructor(private http: HttpClient, private router: Router, private userService: UsersService, public dialog: MatDialog) {}

  createUser(email: string, password: string, fname: string, lname: string, dob: Date, gender: string,
             country: string, city: string, bio: string) {
              // const userData = new FormData();
              const profFileName = email + 'profile';
              let dobnew = null;
              if (dob) {
                const format = 'yyyy-MM-dd';
                const locale = 'en-US';
                dobnew = formatDate(dob, format, locale);
                console.log('DobNew:', dobnew);
              }
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
                dob: dobnew,
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
                '/api/user/signup',
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
                    profileImagePath: res.user.profileImagepath,
                    coverImagePath: res.user.coverImagePath
                  };
                  this.userService.addUser(newUser);
                  this.router.navigate(['/login']);
                }
              }, res => {
                if (res.error.message === 'User Already Exists! Select new email or login with existing one!'){
                  const dialogRef = this.dialog.open(MyDialogComponent, {
                    data:{
                      myMessage: 'User Already Exists! Select new email or login with existing one!',
                      myTitle: 'Failed'
                    }
                  });
                  dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
                  });
                }
              });
             }

  login(email: string, password: string) {
    const authData: AuthData = { email, password};
    this.loginAllow = sessionStorage.getItem('loginallowed');
    if (!this.loginAllow) {
      this.loginAllow = '1';
    }
    if (this.loginAllow !== 'false') {
    this.http
      .post<{ token: string; expiresIn: number, email: string, message: string }>(
        '/api/user/login',
        authData
      )
      .subscribe(res => {
          this.token = res.token;
          // console.log(res);
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
      },
      res => {

          let mislogin = sessionStorage.getItem('loginfailed');
          let dialogRef = this.dialog.open(MyDialogComponent, {
            data:{
              myMessage: 'Invalid email and password combination. Try again!',
              myTitle: 'Login Failed'
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
          if (!mislogin) {
            sessionStorage.setItem('loginfailed', '0');
          }

          mislogin = sessionStorage.getItem('loginfailed');

          let mislogno = parseInt(mislogin, 10);
          console.log('mislogno:', mislogno);
          if (mislogno > 6) {
            //
             dialogRef = this.dialog.open(MyDialogComponent, {
              data:{
                myMessage: 'Exceed Maximum failed login attempts!',
                myTitle: 'Account Locked'
              }
            });
             dialogRef.afterClosed().subscribe( result => {
              console.log('The dialog was closed');
            });
             console.log('Exceeded Maximum failed login attempts');
             sessionStorage.setItem('loginallowed', false.toString());
          }
          mislogno += 1;
          sessionStorage.setItem('loginfailed', mislogno.toString());
      });
    }
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
      this.router.navigate(['/profile']);
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
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('expiration', expirationDate.toISOString());
    sessionStorage.setItem('email', email);
  }

  private clearUserAuthData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expiration');
    sessionStorage.removeItem('email');
  }

  private getUserAuthData() {
    const token = sessionStorage.getItem('token');
    const expirationDate = sessionStorage.getItem('expiration');
    const userInfo = sessionStorage.getItem('email');
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
