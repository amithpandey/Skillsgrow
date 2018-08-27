import { Component, OnInit } from '@angular/core';
import { ListingCourseProxy } from './course-listing.proxy';
import { Router } from '@angular/router';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  providers: [ListingCourseProxy]
})
export class CourseListingComponent implements OnInit {
  public categoryListData: any;
  public imagePath = Constants.IMAGEPATH;
  public courseTiming = 0;
  public user: any;
  public enrollBtn: boolean = true;
  public averageRating = 0;
  public popularTitle: boolean = false;

  rate: number = 4.5;
  slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4 };
  constructor(public listingCourseProxy: ListingCourseProxy, public router: Router,
    public global: Global) { }

  ngOnInit() {
    this.user = this.global.getStorageDetail('user');
    if (this.user) {
      this.user = this.global.getStorageDetail('user').data;
    }
    this.categoryListingCourse();
  }

  afterChange(e) {
    console.log('afterChange');
  }

  categoryListingCourse() {
    this.listingCourseProxy.listCategories()
      .subscribe((success: any) => {
        console.log(success);
        this.categoryListData = success.data;
        if (this.categoryListData.length >= 1) {
          this.categoryListData.filter((data) => {
            if (data.course.length >= 1) {
              this.popularTitle = true;
            }
          });
        }
        this.categoryListData.filter((data) => {
          data.course.filter((course) => {
            if (this.user) {
              if (course.enrolledUser.length >= 1) {
                course.enrolledUser.filter((email) => {
                  if (email.userEmailId === this.user.emailId) {
                    course.enrollBtn = false;
                  }
                });
              }
            }
            if (course.courseReview.length >= 1) {
              course.courseReview.filter((review) => {
                if (!course.ratings) {
                  this.averageRating = this.averageRating + review.rating;
                  course.ratings = this.averageRating;
                  this.averageRating = 0;
                } else {
                  course.ratings = course.ratings + review.rating;
                }
              });
              course.ratings = course.ratings / course.courseReview.length;
            }
            course.timeline.filter((timeline) => {
              timeline.topics.filter((time) => {
                if (!course.timing) {
                  this.courseTiming = this.courseTiming + time.timing;
                  course.timing = this.courseTiming;
                  this.courseTiming = 0;
                } else {
                  course.timing = course.timing + time.timing;
                }
              });
            });
          });
        });
        this.convertMinuteInTime(this.categoryListData);
        console.log(this.categoryListData.length);
      });
  }

  convertMinuteInTime(data) {
    data.filter((categoryListData) => {
      categoryListData.course.filter((timing) => {
        const h = Math.floor(timing.timing / 60);
        const m = timing.timing % 60;
        const hr = h < 10 ? '0' + h : h;
        const min = m < 10 ? '0' + m : m;
        timing.timing = hr + ':' + min;
      });
    });
  }

  viewDetailsCourse(id: number) {
    this.router.navigate(['/coursedetailspage', id]);
  }

  enrollNowCourse(id, chapterLength, timing, ratings, courseName, image, enrollBtn, videoUrl) {
    console.log(ratings);
    if (enrollBtn === undefined) {
      if (!this.global.getStorageDetail('user')) {
        this.global.navigateToNewPage('/login');
      } else {
        const courseObj = {
          courseId: id,
          courseName: courseName,
          courseImage: image,
          courseTiming: timing,
          ratings: ratings,
          courseChapter: chapterLength,
          videoUrl: videoUrl
        };
        this.global.storeDataLocal('currentCourseData', courseObj);
        this.router.navigate(['/enrollmentpage', id]);
      }
    }
  }

}
