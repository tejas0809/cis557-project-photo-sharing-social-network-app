import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  // password = new FormControl('', [Validators.required, Validators.compose(
  //   [
  //     Validators.minLength(5),
  //     Validators.required,
  //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
  //   ]
  //   )]);

  // getPasswordErrorMessage(){
  //   return this.password.hasError('required') ? 'You must enter a password' :
  //       this.password.hasError('minLength') ? 'Password should be of 5 minimum character' :
  //           '';
  // }


}
