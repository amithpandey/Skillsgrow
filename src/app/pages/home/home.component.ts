import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { HomeProxy } from './home.proxy';
import { Router } from '@angular/router';
import { Constants } from '../../common/constants'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeProxy]
})
export class HomeComponent implements OnInit {

  public imagePath: any;
  public listBannerImagesData: any;
  public whatOthersTalkSection = [];
  public mediaWidth: number;
  public x: any;
  public mainWidth: number;
  public smallDevice: boolean = false;
  public discoverBy: string = 'allCourses';

  constructor(public global: Global, public homeproxy: HomeProxy,
  public router: Router) { }

  ngOnInit() {
    this.bannerImagesList();
    this.imagePath = Constants.IMAGEPATH;
    this.whatOthersTalkSection = [
      {
        name: 'Gokul',
        comment: 'Providing great learning opportunities for students through Skillsgrow allows us to ensure that we are bringing the best quality learning to our University.',
        status: 0,
        photo: '',
        occupation: 'Placement Director - Bharath University'
      },
      {
        name: 'Ajith Kumar',
        comment: 'Freshers come with a diverse set of skills, but often need to develop additional technical competencies to find careers in the rapidly evolving workforce. Skillsgrow offers relevant training from top educators that our new recruits can do at their own pace, wherever they are – empowering them with the skills they need to achieve career success',
        status: 0,
        photo: '',
        occupation: 'GENERAL MANAGER - Redington India'
      },
      {
        name: 'Deepak',
        comment: "Skillsgrow's self-paced module encouraged me to get more proactive with my learning. I engaged with the material, took better notes, and staggered the classes to fit in with my busy schedule at Mindtree.",
        status: 0,
        photo: '',
        occupation: 'Lead – Quality Audit Mindtree'
      },
      {
        name: 'Shilpa',
        comment: "I love the fact that, even though it's online training, you get to know the instructors. You have the ability to search by instructor and take several of their courses. That makes it different than other online training offerings.",
        status: 0,
        photo: '',
        occupation: 'Engineering Student'
      },
      {
        name: 'Balachandran',
        comment: "Through Skillsgrow, we’ve been able to be proactive and provide a baseline of knowledge – of say, Angular, for example – so we can utilize our engineering resources no matter the project. We believe Skillsgrow is crucial to making sure we continue to develop our employees’ skills.",
        status: 0,
        photo: '',
        occupation: 'Founder & CEO Powerflow Engineers'
      },
      {
        name: 'Dr. VP Ramamurthy',
        comment: "skillsgrow.com provides us with a very scalable solution. And it's very high quality. Our Skillsgrow Campus  program reporting indicates that some users access the service for short periods to find answers when they need them, which is great. Others log dozens of hours, as though they are walking through a library and reading every book they go by.",
        status: 0,
        photo: '',
        occupation: 'Chairman - Dhanalakshmi College of Engineering'
      },
      {
        name: 'Prof. Vipinendran',
        comment: "Students can watch a skillsgrow.com tutorial at home to learn the basic functionality of software and then put it into context with their professors. It's a more efficient use of time for everyone.",
        status: 0,
        photo: '',
        occupation: 'Anna University'
      }
    ];
    //this.responsiveSlider();
    this.x = window.matchMedia("(max-width: 1100px)");
    this.myFunction(this.x) // Call listener function at run time
    this.x.addListener(this.myFunction) // Attach listener function on state changes
  }

  bannerImagesList() {
    this.homeproxy.bannerImages()
    .subscribe((success: any) => {
      console.log(success);
      this.listBannerImagesData = success.data;
    });
  }

  allCourses(type) {
    if (type) {
      this.router.navigate(['allcourses', type]);
    } else {
      this.router.navigate(['allcourses', this.discoverBy]);
    }
    
  }

  responsiveSlider() {
    let slider = document.getElementById('slider');
    let sliderWidth = slider.offsetWidth;
    let slideList = document.getElementById('sliderwrap');
    let count = 1;
    let items = this.whatOthersTalkSection.length //slideList.querySelectorAll('li').length;
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

  myFunction(x) {
    if (x.matches) { // If media query matches
        this.mediaWidth = 350;
        this.mainWidth = 350;
        this.smallDevice = true;
    } else {
      this.mediaWidth = 500;
      this.mainWidth = 1000;
      this.smallDevice = false;
    }
};

}
