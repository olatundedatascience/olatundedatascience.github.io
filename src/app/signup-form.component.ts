import { ShouldNotStartWithVowels } from './ShouldNotStartWithVowel.validators';
import { UserNameCannotContainSpace } from './UserNameNotSpace.validators';

import { Component } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  constructor(fb: FormBuilder) {
    this.frmBuilder = fb.group({
      phone: fb.control('', Validators.required),
      email: fb.control([]),
      otherphones: fb.array([]),
      contact: fb.group({
        address: fb.control('', Validators.required),
        address2: fb.control([]),
        city: fb.control([]),
        state: fb.control([]),
        country: fb.control([])
      })
    });
  }
  get username() {
    return this.formy.get('username');
  }
  frmBuilder = null;

  showContactForm = false;


  formy: FormGroup = new FormGroup({
    username: new FormControl('', [
      ShouldNotStartWithVowels.noVowels,
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
      UserNameCannotContainSpace.NoSpace
    ]),
    userNameTopics: new FormArray([]),
    password: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    otherDetails: new FormGroup({
      alternateEmail: new FormControl('', Validators.required)
    })
  });

  isNewEmail = false;
  isNewField = false;
  // formy: FormGroup;
  builder: FormBuilder;
  phones: FormControl;
  fieldDetails: String;

  otherDetails = [];

  addOtherPhones(c: HTMLInputElement) {
    (this.frmBuilder.get('otherphones') as FormArray).push(new FormControl(c.value));
    c.value = '';
  }

  otherPhones() {
    return this.frmBuilder.get('otherphones');
  }

  submut(frm) {
    console.log(frm);
  }

  showContact() {
    this.showContactForm = !this.showContactForm;
  }
  makeError() {
    this.formy.setErrors({
      isNotValid: 'Form is Valid'
    });
  }

  addUsernameTopic(topic: HTMLInputElement) {

    (this.formy.get('userNameTopics') as FormArray).push(new FormControl(topic.value));
    console.log(topic);
    topic.value = '';
  }

  removeFrom(topic: FormControl) {
    const index = (this.formy.get('userNameTopics') as FormArray).controls.indexOf(topic);
    (this.formy.get('userNameTopics') as FormArray).removeAt(index);

  }

  userNameTp() {
    return this.formy.get('userNameTopics');
  }
  AddAlternateEmail() {


      this.isNewEmail = !this.isNewEmail;

  }
  LogInfo(name) {
    console.log(name);
    console.log(this.formy);
  }

  log(fork) {
    console.log(fork);
  }

  switchField(val: boolean) {
    console.log(this.isNewField);
    this.isNewField = val;
  }

  AddNewPhone() {
    this.isNewField = true;
    console.log(this.isNewField);
    this.otherDetails.push('phones');
    this.otherDetails.forEach(v => {
      this.formy.addControl(v, new FormControl());
    });
    // this.formy.addControl("phones", new FormControl())
  }

  otherFormBuild(formName: String): FormGroup {
    return this.builder.group({
      formName: ['', Validators.required]
    });
  }

  setField(fildname) {
    this.fieldDetails = fildname;
  }

  isFormDisplayable() {
    return {
      display: this.fieldDetails != '' ? 'block' : 'none'
    };
  }

  /*

    this.formy = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      phone: new FormControl()
    });


  addNewField(formName: String): void {

    this.formy = new FormGroup({
      formName: new FormControl("", Validators.required))
    */
  /*
   this.formy = this.otherFormBuild(formName);
   this.otherDetails.push(this.formy);


  }*/
}
