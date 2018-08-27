import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ListingCourseProxy } from './../../components/course-listing/course-listing.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsPageProxy } from './courseDetailsPage.proxy';
import { Constants } from '../../common/constants';
import { SafePipe } from '../../common/videourl.component';

@Component({
    selector: 'app-course-details-page',
    templateUrl: './courseDetailsPage.component.html',
    providers: [ListingCourseProxy, CourseDetailsPageProxy, SafePipe]
})

export class courseDetailsPageComponent implements OnInit {
    public categoryListData: any;
    public imagePath = Constants.IMAGEPATH;
    public courseDetails = [];
    public id: any;
    public set: any;
    public urlTrue: boolean;
    public timing = 0;
    public courseTiming: any;
    public topicList = [];
    public currentRate = 5;
    public averageRate = 0;
    public reviewFormObj = {
        name: '',
        comment: '',
        rating:  0,
        emailId: '',
        courseId: '',
        status: 0
    };
    public infoMessage: boolean = true;
    public errorMessage: boolean = false;
    public successMessage: boolean = false;
    public message: any;
    public courseId: any;
    public emailMatched: boolean = false;
    public user: any;

    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public listingCourseProxy: ListingCourseProxy, public router: Router,
        public coursedetailspageProxy: CourseDetailsPageProxy,
        public videourl: SafePipe) {
    }

    ngOnInit() {
        this.user = this.global.getStorageDetail('user');
        if (this.user) {
            this.user = this.global.getStorageDetail('user').data;
        }
        // this.id = this.activateRoute.snapshot.params['id'];
        this.activateRoute.params.forEach(params => {
            this.courseId = params["id"];
            this.categoryListingCourse(this.courseId);
        })
        this.set = setInterval(this.defaultTab, 100);
    }

    categoryListingCourse(id) {
        this.listingCourseProxy.listCategories()
            .subscribe((success: any) => {
                this.categoryListData = success.data;
                for (let i = 0; i < this.categoryListData.length; i++) {
                    this.categoryListData[i].course.filter((data) => {
                        if (id === data._id) {
                            this.courseDetails = [];
                            this.courseDetails.push(data);
                            this.courseDetails[0].video = this.videourl.transform(this.courseDetails[0].video);
                            this.courseDetails.filter((data) => {
                                if (this.user) {
                                    if (data.enrolledUser.length >= 1) {
                                        data.enrolledUser.filter((email) => {
                                            if (email.userEmailId === this.user.emailId) {
                                              data.enrollBtn = false;                  
                                            };
                                          });
                                    };
                                }
                                data.courseReview.filter((user) => {
                                    this.averageRate = this.averageRate + user.rating;
                                });
                                this.averageRate = this.averageRate/data.courseReview.length;
                                console.log(this.averageRate);
                            });
                            this.courseDetails[0].timeline.filter((topic) => {
                                this.topicList.push(topic);
                                topic.topics.filter((time) => {
                                    this.timing = this.timing + time.timing;
                                });
                            });
                            console.log(this.courseDetails);
                        }
                    });
                }
                let h = Math.floor(this.timing / 60);
                let m = this.timing % 60;
                let hr = h < 10 ? '0' + h : h;
                let min = m < 10 ? '0' + m : m;
                this.courseTiming =  hr + ':' + min;
                console.log(this.courseTiming);
            });
    }

    aboutCourse(evt, id) {
        const form: any = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        const docs = document.getElementsByClassName('tablinks');
        for (let i = 0; i < docs.length; i++) {
            docs[i].className = docs[i].className.replace('active', '');
        }
        document.getElementById(id).style.display = 'block';
        evt.currentTarget.className += 'active';
        clearInterval(this.set);
    }

    defaultTab() {
        document.getElementById('defaultOpen').click();
    }

    enrollNowCourse() {
        if (!this.user) {
            this.global.navigateToNewPage('/login');
        } else {
            let courseObj = {
                courseId: this.courseId,
                courseName: this.courseDetails[0].courseName,
                courseImage: this.courseDetails[0].imageLarge,
                courseTiming: this.courseTiming,
                courseRating: this.courseDetails[0].ratings,
                videoUrl: this.courseDetails[0].video,
                courseChapter: this.courseDetails[0].timeline.length
            };
            this.global.storeDataLocal('currentCourseData', courseObj);
            this.router.navigate(['/enrollmentpage', this.courseId]);
        }
    }

    onSubmit(form) {
        const user = this.global.getStorageDetail('user');
        if (user) {
            if (this.courseDetails[0].courseReview.length > 0) {
                this.courseDetails[0].courseReview.filter((data) => {
                    if (data.emailId === user.data.emailId) {
                        this.infoMessage = false;
                        this.errorMessage = true;
                        this.emailMatched = true;
                        this.message = 'You already review this course';
                    }
                });
                if (!this.emailMatched) {
                    this.reviewFormData(user,form);
                }
            } else {
                this.reviewFormData(user,form);
            }
        } else {
            this.infoMessage = false;
            this.errorMessage = true;
            this.message = 'Sorry! You not able to review this course';
        }
    }

    reviewFormData(user, form) {
        this.reviewFormObj.emailId = user.data.emailId;
        this.reviewFormObj.rating = this.currentRate;
        this.reviewFormObj.courseId = this.courseDetails[0]._id;
        this.coursedetailspageProxy.courseReviewService(this.reviewFormObj)
        .subscribe((success: any) => {
            console.log(success);
            form.reset();
            this.infoMessage = false;
            this.successMessage = true;
            this.message = 'Review sent successfully !!!';
            this.currentRate = 5;
            this.categoryListingCourse(this.courseId);
        });
    }

}
