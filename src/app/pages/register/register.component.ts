import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterProxy } from './register.proxy';
import { Global } from '../../common/global';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [RegisterProxy]
})

export class RegisterComponent implements OnInit {
    @ViewChild('defaultOpen') div: ElementRef;
    public set: any;
    public learnerData = {
        userName: '',
        emailId: '',
        number: '',
        password: '',
        cpassword: ''
    };
    public successMessage: boolean = false;
    public errorMessage: boolean = false;
    public message: any;

    constructor(public registerProxy: RegisterProxy, public global: Global) {
    }

    ngOnInit() {
        this.set = setInterval(this.defaultTab, 100);
    }

    tabFunction(evt, value) {
        const form: any = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        const docs = document.getElementsByClassName('tablinks');
        for (let i = 0; i < docs.length; i++) {
            docs[i].className = docs[i].className.replace('active', '');
        }
        document.getElementById(value).style.display = 'block';
        evt.currentTarget.className += 'active';
        clearInterval(this.set);
    }

    defaultTab() {
        document.getElementById('defaultOpen').click();
    }

    learnerFieldData(form) {
        if (this.learnerData.password === this.learnerData.cpassword) {
            delete this.learnerData.cpassword;
            console.log(this.learnerData);
            this.registerProxy.registerDataService(this.learnerData)
                .subscribe((success) => {
                    console.log(success);
                    if (success.result) {
                        this.successMessage = true;
                        this.errorMessage = false;
                        this.message = 'Please check your email for account activation !!!';
                        form.reset();
                        /* setTimeout(() => {
                            this.global.navigateToNewPage('/login');
                        }, 5000); */
                    }
                });
        } else {
            this.errorMessage = true;
            this.successMessage = false;
            this.message = 'password does not matched';
        }
    }

}
