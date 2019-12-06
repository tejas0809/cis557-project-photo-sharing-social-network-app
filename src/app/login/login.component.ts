import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersAuthService } from '../profile-page/user-list/usersauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hide = true;

  constructor(public authUserService: UsersAuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Logged In');
    this.authUserService.login(form.value.email, form.value.password);
  }
}
