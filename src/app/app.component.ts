import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UsersAuthService } from './profile-page/user-list/usersauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pixagram';
  hideElement : boolean = false;

  ngOnInit() {
    document.body.style.margin = '0';
    this.authService.autoAuthenticateUser();
  }

  constructor(private router: Router, private authService: UsersAuthService){

    router.events.forEach((event) => {
      if(event instanceof NavigationStart){
        console.log(event['url']);
        if(event['url'].includes('/profile')){
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }
}
