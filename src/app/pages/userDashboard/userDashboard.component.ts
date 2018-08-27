import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../common/global';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import { Constants } from '../../common/constants';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './userDashboard.component.html',
    providers: [ListingCourseProxy]
})

export class UserDashboardComponent implements OnInit {
    public categoryListData: any;
    public progressObj: any[];
    public activeCourses: any;
    public imagePath = Constants.IMAGEPATH;
    public timeTakeInCourse: number;

    constructor(public router: Router, public global: Global,
        public listingCourseProxy: ListingCourseProxy) { }

    ngOnInit() {
        const user = this.global.getStorageDetail('user').data;
        this.activeCourses = user.courseEnrolled;
        let activeCourseProgress = 0;
        if (this.activeCourses.length >= 1) {
            this.activeCourses.filter((data) => {
                activeCourseProgress = (data.courseProgress) ? data.courseProgress + activeCourseProgress : activeCourseProgress + 0;
            });
            activeCourseProgress = activeCourseProgress / this.activeCourses.length;
            activeCourseProgress = Math.round(activeCourseProgress);
            console.log(activeCourseProgress);
            this.timeTakeInCourse = this.global.getStorageDetail('timeTaken');
            this.timeTakeInCourse = this.timeTakeInCourse / 60;
            this.timeTakeInCourse = Math.round(this.timeTakeInCourse);
            console.log(this.timeTakeInCourse);
        }
        this.progressObj = [
            {
                width: '0',
                color: '#38baae',
                title: 'Certificates'
            },
            {
                width: '0',
                color: '#0d88aa',
                title: 'Courses',
                sampleTitle: (this.activeCourses) ? this.activeCourses.length : '0'
            },
            {
                width: activeCourseProgress,
                color: '#F7941D',
                title: 'Active Courses'
            },
            {
                width: '0',
                color: '#ff505d',
                title: 'Total Hours',
                sampleTitle: (this.timeTakeInCourse === undefined) ? '0' : this.timeTakeInCourse + 'min'
            }
        ];
    }

    categoryListingCourse() {
        this.listingCourseProxy.listCategories()
            .subscribe((success: any) => {
                console.log(success);
                this.categoryListData = success.data;
            });
    }

    viewDetailsCourse(id: number) {
        this.router.navigate(['/coursedetailspage', id]);
    }

    enrollNowCourse() {
        if (!this.global.getStorageDetail('user')) {
            this.global.navigateToNewPage('/login');
        } else {
            this.global.navigateToNewPage('/enrollmentpage');
        }
    }

    continue(id) {
        this.router.navigate(['/enrollmentcourselandingpage', id]);
    }

}
