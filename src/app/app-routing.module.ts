import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ActivityFeedComponent } from './profile-page/activity-feed/activity-feed.component';
import { PhotoUploadComponent } from './profile-page/photo-upload/photo-upload.component';
import { UserAuthGuard } from './profile-page/user-list/userauth.guard';
import { ExploreComponent } from './profile-page/explore/explore.component';
import { FollowersComponent } from './profile-page/followers/followers.component';
import { FollowingComponent } from './profile-page/following/following.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfilePageComponent, children: [
      {
        path: '',
        redirectTo: 'myprofile',
        pathMatch: 'full'
      },
      {
        path: 'myprofile',
        component: ProfileComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'photoUpload',
        component: PhotoUploadComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'explore',
        component: ExploreComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'followers',
        component: FollowersComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'following',
        component: FollowingComponent,
        canActivate: [UserAuthGuard]
      },
      {
        path: 'activityfeed',
        component: ActivityFeedComponent,
        canActivate: [UserAuthGuard]
      }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserAuthGuard]
})
export class AppRoutingModule { }
