import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { EnrollmentPageProxy } from './enrollmentPage.proxy';
import { Constants } from '../../common/constants';
import { Router } from '@angular/router';
import { SafePipe } from '../../common/videourl.component';

@Component({
    selector: 'app-enrollemnt-page',
    templateUrl: './enrollmentPage.component.html',
    providers: [EnrollmentPageProxy, SafePipe]
})

export class EnrollmentPageComponent implements OnInit {
    public courseData: any;
    public imagePath = Constants.IMAGEPATH;

    constructor(public global: Global, public enrollmentPageProxy: EnrollmentPageProxy,
    public router: Router, public videourl: SafePipe) {
    }

    ngOnInit() {
        this.courseData = this.global.getStorageDetail('currentCourseData');
        if (!this.courseData) {
            this.global.navigateToNewPage('/home');
        } else {
            this.courseData.videoUrl = this.videourl.transform(this.courseData.videoUrl);
            console.log(this.courseData.videoUrl)
        }
    }

    enrollment() {
        let user = this.global.getStorageDetail('user');
        let userEnrollmentData = {
            courseId: this.courseData.courseId,
            enrolledOn: new Date(),
            userEmailId: user.data.emailId,
            userName: user.data.userName
        }
        this.enrollmentPageProxy.courseEnrolledService(userEnrollmentData)
        .subscribe((success: any) => {
            console.log(success);
            this.userCourseEnrollment();
        });
    }

    userCourseEnrollment() {
        let user = this.global.getStorageDetail('user');
        this.enrollmentPageProxy.listCategories()
        .subscribe((success: any) => {
            let courses = success.data;
            courses.filter((data) => {
                data.course.filter((course) => {
                    if (this.courseData.courseId === course._id) {
                        course.userId = user.data._id;
                        course.enrolledOn = new Date();
                        this.enrollmentPageProxy.userCourseEnrolledService(course)
                        .subscribe((succ: any) => {
                            console.log(succ);
                            user.data.courseEnrolled.push(course);
                            this.global.storeDataLocal('user', user);
                            this.router.navigate(['/enrollmentcourselandingpage', course._id]);
                        });
                    }
                });
            });
        });
    }

}
