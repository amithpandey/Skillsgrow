import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent, LoginComponent, RegisterComponent, AllCoursesComponent, UserDashboardComponent,
  CourseDetailsPageComponent, EnrollmentPageComponent, EnrollmentCourseLandingPageComponent,
  CourseLearningPageComponent, CourseTestPageComponent, ResetPasswordComponent,
  AccountActivationComponent, ResendActivationComponent, ComingSoonComponent, ErrorPageComponent
} from './../pages/all';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'allcourses/:type', component: AllCoursesComponent
  },
  {
    path: 'userdashboard', component: UserDashboardComponent
  },
  {
    path: 'coursedetailspage/:id', component: CourseDetailsPageComponent
  },
  {
    path: 'enrollmentpage/:id', component: EnrollmentPageComponent
  },
  {
    path: 'enrollmentcourselandingpage/:id', component: EnrollmentCourseLandingPageComponent
  },
  {
    path: 'courselearningpage/:id', component: CourseLearningPageComponent
  },
  {
    path: 'coursetestpage/:id', component: CourseTestPageComponent
  },
  {
    path: 'resetpassword/:token', component: ResetPasswordComponent
  },
  {
    path: 'activate/:token', component: AccountActivationComponent
  },
  {
    path: 'resendactivation', component: ResendActivationComponent
  },
  {
    path: 'comingsoon', component: ComingSoonComponent
  },
  {
    path: 'errorpage', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: '/errorpage', pathMatch: 'full'
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
