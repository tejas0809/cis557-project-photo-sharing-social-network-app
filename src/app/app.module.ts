import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ActivityFeedComponent } from './profile-page/activity-feed/activity-feed.component';
import { ProfileHeaderComponent } from './profile-page/profile-header/profile-header.component';
import { PhotoUploadComponent } from './profile-page/photo-upload/photo-upload.component';
import { UsersAuthService } from './profile-page/user-list/usersauth.service';
import { UsersService } from './profile-page/user-list/users.service';
import { PhotosService } from './profile-page/photo-upload/photo.service';
import { ExploreComponent } from './profile-page/explore/explore.component';
import { FollowersComponent } from './profile-page/followers/followers.component';
import { FollowingComponent } from './profile-page/following/following.component';
import { FollowersService } from './profile-page/followers/followers.service';
import { FollowingService } from './profile-page/following/following.service';
import { ActivityFeedService } from './profile-page/activity-feed/activity-feed.service';
import { LikedPostComponent } from './profile-page/liked-posts/liked-post..component';
import { LikedPostsService } from './profile-page/liked-posts/liked-posts.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfilePageComponent,
    ProfileComponent,
    ActivityFeedComponent,
    ProfileHeaderComponent,
    PhotoUploadComponent,
    ExploreComponent,
    FollowersComponent,
    FollowingComponent,
    LikedPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [UsersAuthService, UsersService, PhotosService, FollowersService, FollowingService, ActivityFeedService, LikedPostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
