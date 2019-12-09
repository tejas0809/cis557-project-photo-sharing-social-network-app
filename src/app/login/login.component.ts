import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersAuthService } from '../profile-page/user-list/usersauth.service';

// import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  hide = true;

  constructor(public authUserService: UsersAuthService, public dialog: MatDialog) {}
   
  openDialog(): void { 
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data:{
        myMessage:"Invalid email or password Format. Try again!",
        myTitle:"Login Failed"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  onLogin(form: NgForm) {
    if (form.invalid)  {
      this.openDialog();
      return;
    }
    console.log('Logged In');
    this.authUserService.login(form.value.email, form.value.password);
  }
}
