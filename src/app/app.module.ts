import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from './../../node_modules/ngx-bar-rating/rating.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import {
  HomeComponent, LoginComponent, RegisterComponent, AllCoursesComponent,
  UserDashboardComponent, CourseDetailsPageComponent, EnrollmentPageComponent, EnrollmentCourseLandingPageComponent,
  CourseLearningPageComponent, CourseTestPageComponent, ResetPasswordComponent, AccountActivationComponent, ResendActivationComponent,
  ComingSoonComponent, ErrorPageComponent
} from './pages/all';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginNavigationComponent } from './components/login-navigation/login-navigation.component';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { ProductSectionComponent } from './components/product-section/product-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageOverlayIconComponent } from './components/page-overlay-icon/page-overlay-icon.component';
import { CourseListingComponent } from './components/course-listing/course-listing.component';
import { HttpUtil } from './common/http.util';
import { Global } from './common/global';
import { Constants } from './common/constants';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SafePipe } from './common/videourl.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AllCoursesComponent,
    UserDashboardComponent,
    CourseDetailsPageComponent,
    EnrollmentPageComponent,
    EnrollmentCourseLandingPageComponent,
    CourseLearningPageComponent,
    CourseTestPageComponent,
    InfoBarComponent,
    NavigationComponent,
    LoginNavigationComponent,
    BannerSliderComponent,
    ProductSectionComponent,
    FooterComponent,
    PageOverlayIconComponent,
    CourseListingComponent,
    ResetPasswordComponent,
    AccountActivationComponent,
    ResendActivationComponent,
    ComingSoonComponent,
    ErrorPageComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(), BarRatingModule, DragScrollModule,
    NgbTypeaheadModule,
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    }),
    NgHttpLoaderModule,
    NgCircleProgressModule.forRoot({}),
    Ng2CarouselamosModule,
  ],
  providers: [
    HttpUtil,
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
