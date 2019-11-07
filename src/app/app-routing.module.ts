import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ActivityFeedComponent } from './profile-page/activity-feed/activity-feed.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfilePageComponent, children:[
      {
        path:'',
        redirectTo:'myprofile',
        pathMatch:'full'
      },
      {
        path: 'myprofile',
        component: ProfileComponent
      },
      {
        path: 'activityfeed',
        component: ActivityFeedComponent
      }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
