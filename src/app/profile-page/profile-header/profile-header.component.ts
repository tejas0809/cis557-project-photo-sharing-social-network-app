import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../user-list/usersauth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})

export class ProfileHeaderComponent implements OnInit{
  isUserAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: UsersAuthService){}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsUserAuth();
    this.authListenerSubs = this.authService
      .getUserAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
