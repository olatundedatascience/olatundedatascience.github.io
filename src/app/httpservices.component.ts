
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HtmlParser } from '@angular/compiler';
import { TwentyWordsValidator } from './NotMoreThanTwenty.validators';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import axios from 'axios';


@Component({
    selector: 'httpservices',
    template: `
        <div class="container">

        <div>
        <table class="table">
            <tr>
            <td><a href="#" (click)="switchMode('newuser')"  [ngStyle]="stlObject">New User</a></td>
            <td><a href="#" (click)="switchMode('userlist')" [ngStyle]="stlObject">User List</a></td>
            <td><a href="#"  (click)="switchMode('trashedList')" [ngStyle]="stlObject">Trashed List</a></td>
            <td><a href="#"  (click)="switchMode('sendMessage')" [ngStyle]="stlObject">Send Message</a></td>
            </tr>
        </table>

        </div>
            <div [ngSwitch]="viewMode">
            <div *ngSwitchCase="'sendMessage'">
                <div>
                    <h1>Send Simple sms Message</h1>
                        <form [formGroup]="sendSms">
                        <label>Message Body</label>
                        <input (blur)="det(message)" (keydown)=" keyDownDetect($event)" type="text" #message message="ngModel" (keyup)="detectIfNotMoreThanTwelve($event, message.value)" class="form-control" formControlName="message" />

                        <div *ngIf="Sms.touched && Sms.invalid">
                            <span style="color:red" *ngIf="Sms.errors.required">Message is required</span>
                            <span style="color:red;" *ngIf="Sms.errors.isGreaterThanTwenty">Can not be more than twenty words</span>
                        </div>

                        <h5 style="color:red">You have used {{currentWordLength}} out of 12 allowed words</h5>
                        <hr/>
                        <label>Number</label>
                        <input type="text" class="form-control" formControlName="number" />

                        <input type="button" class="btn btn-primary" value="Send Message" />

                        </form>
                </div>

            </div>
                <div *ngSwitchCase="'userlist'">
                    <input [disabled]="isLoading" type="button" (click)="getData()" value="Get Data" class="btn btn-primary" />
                    <div *ngIf="isLoading">
                        <h1>loading ... </h1>
                    </div>
                    <div *ngIf="!isLoading && responseCode ==200" class="table">
                        <table class="table">
                            <thead>
                                <tr><td>pins</td></tr>
                            </thead>
                            <tbody *ngFor="let k of httpServerData">
                                    <tr>
                                    <td>{{k}}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div *ngSwitchCase="'trashedList'">
                    <form>
                        <input type="number" #size class="form-control" />
                        <input type="checkbox" #list />
                        <input type="number" class="form-control" #length />
                        <input type="button"  value="Create Pin" [disabled]="isAlphaLoading" class="btn btn-primary" (click)="wpin(size.value, list.checked, length.value)" />
                        <div *ngIf="isAlphaLoading">
                            <img src="assets/loading.gif" width="200" height="200" />
                        </div>
                    </form>
                    <hr/>
                    <div *ngIf="alphaPins.length > 0">
                        <ul *ngFor="let k of alphaPins">

                            <li>{{k}}</li>
                        </ul>

                    </div>
                </div>
                    <div *ngSwitchCase="'newuser'">

                    <div *ngIf="typicode.length > 0">
                        <ul *ngFor="let k of typicode">
                            <li>{{k.title}}</li>
                        </ul>
                    </div>
                        <form class="form-group" [formGroup]="frm">
                            <div id="formsuser">
                                <table class="table">
                                    <tr>
                                        <td>
                                            userid
                                        </td>
                                        <td>
                                            <input type="text" formControlName="userid" class="form-control" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>id</td><td><input type="text" formControlName="id" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <td>title</td><td><input type="text" formControlName="title" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <td>body</td><td><input type="text" formControlName="body" class="form-control" /></td>
                                    </tr>
                                    <tr>
                                        <td>Action</td><td><input type="submit" class="btn btn-primary" value="Post User" /></td>
                                    </tr>
                                </table>
                            </div>

                        </form>

                    </div>
            </div>



        </div>
    `
})

export class httpservicescomponent {
      //  http:HttpClient;

    constructor(fb: FormBuilder, private http: HttpClient, fki?: FormBuilder) {
        this.frm = fb.group({
            userid: fb.control('', Validators.required),
            title: fb.control('', Validators.required),
            body: fb.control([]),
            id: fb.control([])
        });

        this.sendSms =  fki.group({
            message: fki.control('', [Validators.required, TwentyWordsValidator.isGreaterThanTwenty]),
            number: fki.control('', [Validators.required, Validators.minLength(13)])
        });

      //  this.http = htp;
        if (this.viewMode == 'newuser') {
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((v) => {
        // this.typicode = Array.from(v)
        console.log(v);
        });
}




    }

    get Sms() {
        return this.sendSms.get('message');
    }
        frm = null;
        sendSms;
        currentWordLength = 0;
        fki: FormBuilder;
        isLoading = false;
        responseCode = 0;
        httpServerData = [];
        typicode = [];
        alphaPins = [];
        isAlphaLoading = false;
    addNewUser = false;
    stylObject = {
       'text-decoration': 'none',
        color: 'green',
        'font-size': '20px'
    };

    viewMode = 'newuser';
    hoverFlag = false;

    hoverClass = {
        'text-decoration': 'underline',
        color: 'red',
        'font-weight': 'bold',
        coursor: 'pointer',
        'font-size': '20px'
    };


    wpin(size, list, len) {
        this.alphaPins.splice(0, this.alphaPins.length);
        this.isAlphaLoading = true;
        /*
        this.http.post("http://localhost:3100/api/randomNumber", {length:len, "list":list, "size":size}, {headers:{'Content-Type':"application/json"}})
        .subscribe((res)=>{
            if(res.status == 200) {
                var response = Array.from(res);
            response.forEach((v)=>{
                this.alphaPins.push(v)
            })

            }

            this.isAlphaLoading = false;

        }
        , (error:Response)=>{
            this.isAlphaLoading = false;
            console.log(error.json())
            alert(error.json())
        }
        *)/

      //  console.log(list)
    }

    getPlaeceHolder(){
        // https://jsonplaceholder.typicode.com/posts
        if(this.viewMode == 'newuser'){
                this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((v)=>{
                    console.log(v)
                })
        }
    }


    getData(){
        //var htpRequest = new HttpRequest("GET","jsonplaceholder.typicode.com/posts")
        //var req = request("jsonplaceholder.typicode.com/posts")
        //var _req = new request()
      //  this.http.send(htpRequest)
      //var header = new HttpHeaders({"x-time-Sent":"application/json"}).append("Content-Type", "application/json")
      //var HttpRe = new HttpRequest("GET", "jsonplaceholder.typicode.com/posts", {header})
      //  console.log("button clicked")
      this.httpServerData.splice(0, this.httpServerData.length)
        var response:any;
        this.isLoading=true;
            axios.get("http://localhost:3100/pin/10/12").then((v)=>{
            this.responseCode= v.data.responseCode;
            var _arr = Array.from(v.data.data)    ;

            _arr.forEach((v)=>this.httpServerData.push(v))
            //console.log(v.data)

            this.isLoading = false;
            })
            /*.catch((er)=>{
                this.isLoading = false;
                alert(er)
            })
            */
        /*
     this.http.get("http://localhost:3100/pin/10/12").subscribe((v)=>{
            //var _array = Array.from(v.valueOf())
            //console.log(v)
            response = v;
            console.log(response)
            this.isLoading = false;
     })
      */


      // return this.http.send()


    }



    det(k) {
        console.log(k);
    }
    canNewForm() {
        return (this.addNewUser) ? true : false;
    }

    keyDownDetect(e) {
        let curentKey = (e.key as string);
        if (this.currentWordLength > 12) {
            if (curentKey.toLowerCase() ==  'backspace') {
                return true;
            } else {
                return false;
            }

        }


    }
    detectIfNotMoreThanTwelve(e, k) {
       // console.log(e)
            let cur = ((k as string).split(' ')).length;
            this.currentWordLength = cur;
            if (this.currentWordLength == 12) {
                return false;
            } else {
                return true;
            }
        }


    newFormDiv() {
        let divElement = new HTMLDivElement();
        let tblElement = new HTMLTableElement(); // <table> tag
        let rowone = new HTMLTableRowElement(); // tr element (first row)
        let dataone = new HTMLTableDataCellElement(); //
        dataone.innerText = 'userid';
        let Coltwo = new HTMLTableColElement();
        let inputELement = new HTMLInputElement();
        inputELement.type = 'text';
        inputELement.setAttribute('formControlName', 'userid');
        Coltwo.appendChild(inputELement);
        let colOne = new HTMLTableColElement();
        dataone.appendChild(colOne);


        let rowTwo = new HTMLTableRowElement();
        tblElement.className = 'table';
        tblElement.appendChild(new HTMLTableCellElement());
    }

    userNames() {}

    switchMode(mode) {
        console.log(this.viewMode);
        this.viewMode = mode;
    }

    onHover() {
        this.hoverFlag = !this.hoverFlag;
    }

    applyStyle() {
        if (this.hoverFlag) {
            return this.hoverClass;
        } else {
            return this.stylObject;
        }
    }



}
