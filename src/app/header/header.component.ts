import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../profile-page/user-list/usersauth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: UsersAuthService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsUserAuth();
    console.log(this.isUserAuthenticated);
    this.authListenerSubs = this.authService
      .getUserAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

}
