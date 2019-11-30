import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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

}
