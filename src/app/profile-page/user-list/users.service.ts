import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUser(email: string){

   return this.http.get<{
      user: User
    }>('http://localhost:3000/api/user/' + email);
  }

}
