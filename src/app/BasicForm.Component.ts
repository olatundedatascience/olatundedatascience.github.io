import { Component } from '@angular/core';

@Component({
  selector: 'basicform',
  template: `
    <div class="container">
    <div [ngSwitch]="templateMode">
            <a href="#" (click)="switchTemplate('LoginForm')" class="btn btn-primary">Login Form</a>
            <a href="#" (click)="switchTemplate('BasicForm')" class="btn btn-success">Basic Form</a>
            <a href="#" (click)="switchTemplate('SignUpForm')" class = "btn btn-success">Sign Up Form </a>
            <a href="#" (click)="switchTemplate('httpservices')" class="btn btn-success">Http Back End </a>
            <hr/>

            <div *ngSwitchCase="'LoginForm'">
       <login></login>

    </div>

    <div *ngSwitchCase="'SignUpForm'">
        <signup-form></signup-form>
    </div>
    <div *ngSwitchCase="'httpservices'">
            <httpservices></httpservices>
    </div>

    <div *ngSwitchCase="'BasicForm'">
    <div [ngSwitch] ="viewMode" class="row">
    <div class="col-lg-3">
                <a href="#" (click)="switchMode('newcontact')" class="btn btn-success">New Contact Form </a><br/>
                <hr/>
                <a href="#" (click)="switchMode('contactlist')" class="btn btn-primary">Contact List </a><br/>
                <hr/>
                <a href="#"  (click)="switchMode('trashed')"class="btn btn-warning">Trashed</a>

    </div>

    <div *ngSwitchCase = "'contactlist'" class="col-lg-3">
        <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th><th>FullName</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Action</th>
                    </tr>
                </thead>

                <tbody>

                        <tr *ngFor="let k of contactList">
                        <td>{{k.id}}</td>
                        <td>{{k.FullName}}</td>
                        <td>{{k.Email}}</td>
                        <td>{{k.Phone}}</td>
                        <td>{{k.Subject}}</td>
                        <td>{{k.Message}}</td>
                        <td><fav (change)="getChange($event)" [isSelected]="confirmed"></fav></td>
                        <td>
                            <a href="" (click)="delete(k.id)">Delete</a>
                        </td>
                        </tr>
                  <ng-template [ngIf]="!(contactList.length > 0)">
                        <tr>
                            <td colspan="7">No Recent Contact</td>
                        </tr>
                  </ng-template>




                </tbody>
        </table>
    </div>
        <div *ngSwitchCase = "'newcontact'" class="col-lg-3">
                <form class="form-control" #f="ngForm" (ngSubmit)="submit(f)">
                    <table class="table">

              <div ngFormGroup="basicContact" #basicContact>
                    <tr>
                    <td>FullName</td>
                    <td><input minlength="3" maxlength="10" (blur)="log(fullname)" required ngModel type="text" #fullname="ngModel" name="fullname" class="form-control" /></td>
                    <div>
                        <ul *ngIf="fullname.touched && !fullname.valid">
                            <li *ngIf="fullname.errors.required" style="color:red">FullName is required....</li>
                            <li *ngIf="fullname.errors.minlength" style="color:red">minimum length is 3...</li>
                            <li *ngIf="fullname.errors.maxlength" style="color:red">maximum length is 3....</li>
                        </ul>

                    </div>

                </tr>
                <tr>
                    <td>Email Address</td>
                    <td><input required type="text" name="email" #email="ngModel" ngModel class="form-control" /></td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td><input (blur)="log(phone)" name="phone" ngModel required #phone="ngModel" type="text" class="form-control" /></td>
                    <td>
                        <div *ngIf="phone.touched && !phone.valid">
                                <span style="color:red">Phone Number is required </span>
                        </div>
                    </td>
                </tr>

            </div>

            <div ngModelGroup="otherinfo" #otherinfo>

 <tr>
                            <td>Subject</td>
                            <td><input type="text" #subject class="form-control" /></td>
                        </tr>
                        <tr>
                            <td>Your Message</td>
                            <td><textarea col="10" rows="10"  #message class="form-control"></textarea></td>
                        </tr>

                        <tr>
                        <td colspan="2"><button type="submit" value="Add New" class="btn btn-success" (click)="addNewContact(fullname.value, email.value, phone.value, subject.value, message.value )">
                        Add New Contact </button>
                        </td>
                        </tr>
            </div>


                    </table>
                    <h5 style="color:red;">{{formResponse}}</h5>
                </form>
        </div>
        <div *ngSwitchCase = "'trashed'" class="col-lg-3">
                    <h1>Trashed List</h1>
        </div>
    </div>
</div>
    </div>


    </div>
    `
})
export class BasicFormComponent {
  viewMode: String = 'trashed';
  templateMode = 'LoginForm';
  confirmed: true;
  contactObject: FormObject = {
    Id: '' + Date.now() + Math.floor(Math.random() * 100000),
    FullName: '',
    Email: '',
    Phone: '',
    Subject: '',
    Message: ''
  };
  formResponse: String = '';
  trashedList = Array<FormObject>();
  contactList = Array<FormObject>();

  switchTemplate(vl) {
      this.templateMode = vl;
  }

  getChange(event) {
      console.log(event);
  }

  switchMode(obj: String) {
   // $event.preventDefault();
    this.viewMode = obj;
  }

  log(x) {
      console.log(x);
  }

  submit(f) {
      console.log(f);
  }

  addNewContact(fullnam, email, phone, subject, message) {
    this.contactObject.FullName = fullnam;
    this.contactObject.Email = email;
    this.contactObject.Phone = phone;
    this.contactObject.Subject = subject;
    this.contactObject.Message = message;

    if (this.contactList.indexOf(this.contactObject) > -1) {
      this.formResponse = `${this.contactObject.Email} already exist`;
    } else {
      this.contactList.push(this.contactObject);

      this.switchMode('contactlist');
    }
  }
}

interface FormObject {
  Id: String;
  FullName: String;
  Email: String;
  Phone: String;
  Subject: String;
  Message: String;
}
