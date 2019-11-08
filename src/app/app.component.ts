import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pixagram';
  hideElement : boolean = false;

  ngOnInit(){
    document.body.style.margin = '0';
  }

  constructor(private router: Router){

    router.events.forEach((event) => {
      if(event instanceof NavigationStart){
        console.log(event['url']);
        if(event['url'].includes('/profile')){
          this.hideElement = true;
        }else{
          this.hideElement = false;
        }
      }
    });
  }
}
