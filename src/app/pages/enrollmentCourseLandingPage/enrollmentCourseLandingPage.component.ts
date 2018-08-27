import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Constants } from '../../common/constants';

@Component({
    selector: 'app-enrollemnt-page',
    templateUrl: './enrollmentCourseLandingPage.component.html'
})

export class EnrollmentCourseLandingPageComponent implements OnInit {
    public topics: boolean = true;
    public dummy = ['1','2','3','4'];
    public selectedItem;
    public progressObj: any[];
    public imagePath = Constants.IMAGEPATH;
    public courseId: any;
    public courseListData: any;
    public averageCourseScore = 0;

    constructor(public global: Global, public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        let hourSpent = this.global.getStorageDetail('timetaken');
        hourSpent = hourSpent/60;
        hourSpent = Math.round(hourSpent);
        this.activateRoute.params.forEach(params => {
            this.courseId = params["id"];
        });
        let user  = this.global.getStorageDetail('user').data;
        user.courseEnrolled.filter((data) => {
            if (data._id === this.courseId) {
                this.courseListData = data;
            }
        });
        console.log(this.courseListData);
        this.courseListData.timeline.filter((timeline) => {
            timeline.topics.filter((topic) => {
                if (topic.markScore) {
                    let score = topic.markScore * 100 / topic.questions.length-1;
                    this.averageCourseScore = this.averageCourseScore + score / 2;
                }
            })
        });
        this.progressObj = [
            {
                width: this.courseListData.courseProgress,
                color: '#38baae',
                title: this.courseListData.courseName
            },
            {
                width: this.averageCourseScore,
                color: '#0d88aa',
                title: 'Score'
            },
            {
                width: hourSpent,
                color: '#F7941D',
                title: 'Hours Spent'
            },
            {
                width: this.courseListData.courseProgress,
                color: '#ff505d',
                title: 'Progress'
            }
        ];
        this.accordin(event, 0);
    }

    accordin(event, newValue) {
    console.log(newValue);
    if (this.topics) {
        this.topics = false;
        this.selectedItem = newValue;
    } else {
        this.topics = true;
        this.selectedItem = -1;
    }
    }

    learningPageUrl(data, chapterName, mark) {
        console.log(data);
        let status: boolean;
        if (mark || mark === 0) {
            status = true;
        } else {
            status = false;
        }
        let courseObj = {
            'courseId' : this.courseId,
            'chapterName' : chapterName,
            'topicName' : data.subTopics,
            'timing' : data.timing,
            'order' : data.order,
            'description' : data.description,
            'questionsLength' : (data.questions) ? data.questions.length-1 : 0,
            'testStatus' : status
        }
        this.global.storeDataLocal('courselearn', courseObj);
        this.router.navigate(['courselearningpage', this.courseId]);
    }

}
