import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Global } from '../../common/global';

@Component({
    selector: 'app-course-learning-page',
    templateUrl: './courseLearningPage.component.html'
})

export class CourseLearningPageComponent implements OnInit {
    public paramsData: any;

    constructor(private activeRoute: ActivatedRoute, private router: Router,
    public global: Global) { }

    ngOnInit() {
        this.paramsData = this.global.getStorageDetail('courselearn');
    }

    takeTest() {
        this.router.navigate(['coursetestpage', this.paramsData.courseId]);
    }

}
