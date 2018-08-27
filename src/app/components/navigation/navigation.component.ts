import { Component, OnInit, HostListener } from '@angular/core';
import { Global } from '../../common/global';
import { NavigationEnd, Router } from '@angular/router';
import { ListingCourseProxy } from '../course-listing/course-listing.proxy';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ListingCourseProxy]
})
export class NavigationComponent implements OnInit {

  navBarFixed: boolean = false;
  megaMenu: boolean = false;
  public logoutNavigation: boolean;
  categoryListData: any;
  model: any;
  course = [];

  constructor(public listingCourseProxy: ListingCourseProxy, public router: Router,
    public global: Global) { }

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.pageYOffset >= 150) {
      this.navBarFixed = true;
    } else {
      this.navBarFixed = false;
    }
  }

  ngOnInit() {
    this.categoryListingCourse();
  if (this.global.getStorageDetail('user')) {
    this.logoutNavigation = true;
  } else {
    this.logoutNavigation = false;
  }
  }

  logout() {
    this.global.clearLocalStorage();
    this.logoutNavigation = false;
    this.global.navigateToNewPage('/login');
  }

  userDashboardPath() {
    if (this.global.getStorageDetail('user')) {
      this.global.navigateToNewPage('/userdashboard');
    }
  }

  showMegaMenu() {
    if (this.megaMenu) {
      this.megaMenu = false;
    } else {
      this.megaMenu = true;
    }
  }

  categoryListingCourse() {
    this.listingCourseProxy.listCategories()
    .subscribe((success: any) => {
      console.log(success);
      this.categoryListData = success.data;
      this.courseObj();
    });
  }

  viewDetailsCourse(id: number) {
    this.router.navigate(['/coursedetailspage', id]);
  }

  courseObj() {
    this.categoryListData.filter((data) => {
      data.course.filter((datas) => {
        this.course.push(datas);
      });
    });
    console.log(this.course);
  }


  alerting(id) {
    console.log(id);
    this.router.navigate(['/coursedetailspage', id]);
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.course.filter(v => v.courseName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {courseName: string}) => x.courseName;

  keyDownFunction(event, id) {
    if (event.keyCode === 13) {
      this.router.navigate(['/coursedetailspage', id]);
    }
  }

}
