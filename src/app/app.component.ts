import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Global } from './common/global';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
    public developerMode: boolean;
    public spinkit = Spinkit;
    public sampleCount: any[];
    public seconds = 0;
    public timer: any;
    public items: any[];

  constructor(private router: Router, public global: Global) { }

  ngOnInit() {
    this.items = ['1','2','3','4','5'];
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
        if (this.router.url.split('?')[1] === 'dev=true') {
            this.developerMode = true;
            this.global.storeDataLocal('develop', this.developerMode);
          } else if (this.router.url.split('?')[1] === 'dev=false') {
            this.developerMode = false;
            this.global.deleteLocalData('develop');
          }

          if (this.router.url.split('?')[0] === '/courselearningpage') {
            this.startTimer();
          } else {
            this.global.storeDataLocal('timeTaken', this.seconds);
            clearInterval(this.timer);
            this.seconds = 0;
          }

    });
    //this.responsiveSlider();
}

startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
  }, 1000);
}

responsiveSlider() {
  let slider = document.getElementById('slider');
  let sliderWidth = slider.offsetWidth;
  let slideList = document.getElementById('sliderwrap');
  let count = 1;
  let items = this.sampleCount.length //slideList.querySelectorAll('li').length;
  let prev = document.getElementById('prev');
  let next = document.getElementById('next');

  window.addEventListener('resize', function() {
    sliderWidth = slider.offsetWidth;
  });

  let prevSlide = function() {
    if (count > 1) {
      count = count - 2;
      slideList.style.left = '-' + count * sliderWidth + 'px';
      count++; 
    } else if (count = 1) {
      count = items - 1;
      slideList.style.left = '-' + count * sliderWidth + 'px';
      count++;
    }
  }

  let nextSlide = function() {
    if (count < items) {
      slideList.style.left = '-' + count * sliderWidth + 'px';
      count++; 
    } else if (count = 1) {
      slideList.style.left = '0px';
      count = 1;
    }
  }

  next.addEventListener('click', function() {
    nextSlide();
  });

  prev.addEventListener('click', function() {
    prevSlide();
  });

  setInterval(function() {
    nextSlide();
  }, 8000);
}

}
