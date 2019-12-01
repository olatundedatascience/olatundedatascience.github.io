
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: './loginForm.html'
})
export class LoginForm {
    isInvalidLogin = false;
    isSent = false;

    constructor(private http: HttpClient) {

    }

    contactMethod: Array<Object> = [
        {id: '1', name: 'phone'},
        {id: '2', name: 'email'},
        {id: '3', name: 'fax'}
    ];

    // https://jasonwatmore.com/post/2018/05/11/angular-6-template-driven-forms-validation-example
    // https://medium.com/@mail.bahurudeen/create-a-dynamic-form-with-configurable-fields-and-validations-using-angular-6-994db56834da
    // https://medium.com/@krishnaregmi/how-to-create-dynamic-forms-in-angular-7-using-formcontrol-a443a2c5e3a9

    osubmit(helpy) {
        console.log(helpy);
    }

    logme(f) {
        console.log(f);
    }

    LoginMe(username, password) {
        this.isSent = true;
        let bdy = {
            username: username,
            password: password
        };

        this.http.post('http://localhost:4700/login', bdy).subscribe((v => {
            /*
            //var statusCode = v.statusCode
            //console.log(v)
            if(statusCode == 401){
                this.isInvalidLogin = true;

                setTimeout(()=>{
                    this.isInvalidLogin=false
                }, 4000)
            } */
        }));


        this.isSent = false;
    }

}
