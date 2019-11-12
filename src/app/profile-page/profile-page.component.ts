import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UsersAuthService } from './user-list/usersauth.service';
import { UsersService } from './user-list/users.service';
import { User } from './user-list/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userEmail: string;
  userInfo: User;
  userAuthSub: Subscription;
  isUserAuthenticated = false;

  constructor(private breakpointObserver: BreakpointObserver, public authUserService: UsersAuthService,
              private userService: UsersService ) {}

  ngOnInit() {
    this.userEmail = this.authUserService.getUserEmail();
    this.userService.getUser(this.userEmail).subscribe(userData => {
      this.userInfo = userData.user;
    });

    this.isUserAuthenticated = this.authUserService.getIsUserAuth();

    this.userAuthSub = this.authUserService
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.authUserService.getUserEmail();
                  });
  }

  ngOnDestroy() {
    this.userAuthSub.unsubscribe();
  }
}
