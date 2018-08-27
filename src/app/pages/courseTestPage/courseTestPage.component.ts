import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTestPageProxy } from './courseTestPage.proxy';
/* 8&e!^)tJ4^*M */
@Component({
    selector: 'app-course-test-page',
    templateUrl: './courseTestPage.component.html',
    providers: [CourseTestPageProxy]
})

export class CourseTestPageComponent implements OnInit {
    public categoryListData: any;
    public imagePath = Constants.IMAGEPATH;
    public questionobj = [];
    seconds: number;
    timer;
    quesIndex: number = 1;
    allQuestion: any;
    selectedItem: number;
    public questionWithAnswer = [];
    userAnswer: any;
    noOfQuestions: any;
    userScore: any;
    public previousSelectedItem = [];
    questionAnswer = '';
    public paramsData: any;
    public testData: any;
    public showMark: boolean = false;
    public successMessage: boolean = false;
    public infoMessage: boolean = false;
    public message: any;
    public findQuestionNo: any;
    public passageAnswer = [];
    public questionNumber: any;

    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public router: Router, public courseTestProxy: CourseTestPageProxy) { }

    ngOnInit() {
        this.paramsData = this.global.getStorageDetail('courselearn');
        if (!this.paramsData) {
            this.global.navigateToNewPage('/home');
        }
        const user = this.global.getStorageDetail('user').data;
        user.courseEnrolled.filter((data) => {
            if (data._id === this.paramsData.courseId) {
                data.timeline.filter((title) => {
                    if (title.title === this.paramsData.chapterName) {
                        title.topics.filter((topic) => {
                            if (topic.subTopics === this.paramsData.topicName) {
                                this.testData = topic;
                            }
                        });
                    }
                });
            }
        });
        this.seconds = 0;
        if (this.testData.questions.length > 1) {
            this.questionIndex(1);
        } else {
            this.successMessage = false;
            this.infoMessage = true;
            this.message = 'No Question in this Topic....redirecting to Home page';
            setTimeout(() => {
                this.global.navigateToNewPage('/home');
            }, 5000);
        }
        this.numberOfQuestions(1, 'event', 1);
    }

    timeElapsed() {
        return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
    }

    questionIndex(index) {
        console.log(index);
        const data = this.testData.questions;
        this.allQuestion = data;
        const findIndex = [];
        this.allQuestion.filter((findStatus, ind) => {
            if (findStatus[1] === '1' || findStatus[1] === '0') {
                findIndex.push(ind);
            }
        });
        this.findQuestionNo = findIndex;
        console.log(this.findQuestionNo);
        if (data[index][1] === '0') {
            this.questionobj.push({
                question: data[index][3],
                options: data[index][4].split(','),
                answer: data[index][5],
                questionType: data[index][2],
                time: data[index][7],
                id: index,
            });
            for (let i = 0; i < this.questionobj[0].options.length; i++) {
                this.questionobj[0].options[i] = this.questionobj[0].options[i].trim();
            }
        } else if (data[index][1] === '1') {
            const a = [];
            for (let i = 1; i <= data[index][4]; i++) {
                a.push({
                    question: data[index + i][3],
                    options: data[index + i][4].split(','),
                    answer: data[index + i][5],
                    questionType: data[index + i][2],
                    time: data[index + i][7],
                    id: index,
                    userAnswer: ''
                });
            }
            this.questionobj.push({
                passage: data[index][3],
                question: a,
                id: index
            });
            for (let i = 0; i < this.questionobj[0].question.length; i++) {
                for (let j = 0; j < this.questionobj[0].question[i].options.length; j++) {
                    this.questionobj[0].question[i].options[j] = this.questionobj[0].question[i].options[j].trim();
                }
            }
        }
        console.log(this.questionobj);
        this.startTimer();
    }

    startTimer() {
        const time = setInterval(() => {
            this.seconds++;
        }, 1000);
    }

    answer(event, ans, index) {
        this.userAnswer = ans;
        console.log(ans);
    }

    saveAndContinue(clicktype) {
        const timetaken = this.timeElapsed();
        const checkLastQuestionsLength = this.allQuestion.length - 1;
        if (clicktype === 'btnClick') {
            if (checkLastQuestionsLength === this.selectedItem) {
                this.removeDuplicateObject(timetaken);
                this.questionobj = [];
                this.showMark = true;
                this.markScore();
            } else {
                this.removeDuplicateObject(timetaken);
                this.userAnswer = '';
                this.questionAnswer = '';
                this.questionobj = [];
                let count;
                this.findQuestionNo.filter((data, index) => {
                    if (this.selectedItem === data) {
                        count = this.findQuestionNo[index + 1];
                    }
                });
                this.selectedItem = count;
                this.questionIndex(this.selectedItem);
            }
        } else {
            console.log(this.questionWithAnswer);
            this.removeDuplicateObject(timetaken);
            this.seconds = 0;
            this.userAnswer = '';
            this.questionAnswer = '';
            this.questionobj = [];
            this.questionIndex(this.selectedItem);
        }
    }

    numberOfQuestions(i, event, questionNumber) {
        this.selectedItem = i;
        this.questionNumber = questionNumber;
        this.saveAndContinue('normal');
        console.log(this.selectedItem, this.questionWithAnswer);
        if (this.questionWithAnswer.length >= 1) {
            this.questionWithAnswer.filter((data) => {
                if (data.id === this.selectedItem) {
                    console.log(data);
                    let array = [];
                    array.push(data);
                    this.questionobj = array;
                    array = [];
                    this.userAnswer = '';
                    this.questionAnswer = '';
                    this.questionAnswer = data.userAnswer;
                    this.userAnswer = this.questionAnswer;
                    console.log(this.userAnswer, this.questionAnswer, data.userAnswer);
                }
            });
        }
    }


    markScore() {
        let score = 0;
        let wrong = 0;
        const checkQuestionsLength = this.allQuestion.length - 1;
        this.questionWithAnswer.filter((data) => {
            console.log(data);
            if (data.userAnswer !== data.answer) {
                wrong++;
            } else {
                score++;
            }
        });
        this.userScore = score;
        this.noOfQuestions = checkQuestionsLength;
        console.log(score, wrong, checkQuestionsLength);
        this.submitTheMarkInDb();
    }

    removeDuplicateObject(timetaken) {
        if (this.questionWithAnswer.length >= 1) {
            let noIdFind: boolean;
            this.questionWithAnswer.filter((data) => {
                if (data.id === this.questionobj[0].id) {
                    data.userAnswer = this.userAnswer;
                    data.timetaken = timetaken;
                    noIdFind = true;
                }
            });
            if (!noIdFind) {
                // alert('no id');
                this.questionobj.filter((data) => {
                    data.userAnswer = this.userAnswer;
                    data.timetaken = timetaken;
                    this.questionWithAnswer.push(this.questionobj[0]);
                });
            }

        } else {
            this.questionobj.filter((data) => {
                // alert('true');
                data.userAnswer = this.userAnswer;
                data.timetaken = timetaken;
                this.questionWithAnswer.push(this.questionobj[0]);
            });
        }
        this.questionWithAnswer.filter((data) => {
            if (data.userAnswer) {
                this.allQuestion[data.id][7] = 'true';
            } else {
                this.allQuestion[data.id][7] = 'false';
            }
        });
    }

    submitTheMarkInDb() {
        let i = 0;
        this.testData.markScore = this.userScore;
        this.testData.allQuestionsWithAnswer = this.questionWithAnswer;
        const user = this.global.getStorageDetail('user');
        user.data.courseEnrolled.filter((data) => {
            if (data._id === this.paramsData.courseId) {
                data.timeline.filter((title) => {
                    i = i + title.topics.length;
                    data.totalTopics = i;
                    if (title.title === this.paramsData.chapterName) {
                        title.topics.filter((topic) => {
                            if (topic.subTopics === this.paramsData.topicName) {
                                data.completedTopics = (data.completedTopics) ? data.completedTopics + 1 : 0 + 1;
                                data.currentScore = this.userScore + '/' + this.findQuestionNo.length;
                                data.currentTopic = this.paramsData.topicName;
                                data.questionLength = this.findQuestionNo.length;
                                topic.markScore = this.userScore;
                                topic.allQuestionsWithAnswer = this.questionWithAnswer;
                            }
                        });
                    }
                    data.courseProgress = data.completedTopics * 100 / data.totalTopics;
                    data.courseProgress = Math.round(data.courseProgress);
                });
            }
        });
        this.courseTestProxy.userScore({ userId: user.data._id, courses: user.data.courseEnrolled })
            .subscribe((success) => {
                console.log(success);
            });
        console.log(user);
        const userData = this.global.storeDataLocal('user', user);
        this.global.deleteLocalData('courselearn');
    }

    goToDashboardPage() {
        this.router.navigate(['enrollmentcourselandingpage', this.paramsData.courseId]);
    }

}
