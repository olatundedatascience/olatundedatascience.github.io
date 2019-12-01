import { ForgetPasswordComponent } from './ForgetPassword.Component';
import { MovieServices } from './movies.services';
import { Component } from '@angular/core';
import { MovieGenerator } from './movies';
import { RandomGenerator } from './RandomNumberGen';
import { likeComponent } from './like.component';

// import {MovieServices}

@Component({
  selector: 'courses',
  template: `
    <style>
      .active {
        background-color: "red";
      }
      .inactive {
        background-color: "yellow";
      }
    </style>
    <div class="bg bg-primary">
      <h1>{{ "TotalMovie:" + listOfMovie.length }}</h1>
    </div>
    <h1>Add New Movie</h1>
    <table class="table">
      <tr>
        <td>Name</td>
        <td>
          <input
            (keydown)="focus(name.value)"
            type="text"
            #name
            class="form-control"
          />
        </td>
      </tr>
      <tr>
        <td>Price</td>
        <td><input type="text" #price class="form-control" /></td>
      </tr>
      <tr>
        <td>rate</td>
        <td><input type="text" #rate class="form-control" /></td>
      </tr>
      <tr>
        <td>ID</td>
        <td>
          <input
            [value]="NameType || ''"
            type="text"
            #id
            readonly
            class="form-control"
          />
        </td>
      </tr>
      <tr>
        <td>Description</td>
        <textarea
          [ngStyle]="styleObject"
          #description
          class="form-control"
          cols="10"
          rows="5"
        ></textarea>
      </tr>
      <tr>
        <td>In Cinema</td>
        <td><input #ince type="checkbox" class="form-control" /></td>
      </tr>
      <tr>
        <td>
          <button
            (click)="
              addew(
                name.value,
                price.value,
                rate.value,
                id.value,
                ince.checked,
                description.value
              )
            "
            class="btn btn-primary"
          >
            add New Movie
          </button>
        </td>
        <td>
          <button (click)="generateId($event)" class="btn btn-info">
            Generate ID
          </button>
        </td>
      </tr>
    </table>

    <!--
    <input (keyup) ="typeName($event)" class="form-control" type="text" placeholder="type a movie name" />
    <h1> {{NameType}}</h1>
    -->
    <hr />
    <table class="table table-bordered">
      <tr>
        <th>Name</th>
        <th>Rate</th>
        <th>Price</th>
        <th>ID</th>
        <th>Date Created</th>
        <th>Status</th>
        <th>Decription</th>
        <th>Add to Favourite</th>
      </tr>
      <tbody *ngFor="let c of listOfMovie">
        <td>
          {{ c.name | uppercase }}
        </td>
        <td>{{ c.rate }}</td>
        <td>{{ c.price | number: "1.2-2" | currency: "NGN":"symbol" }}</td>
        <td>{{ c.id }}</td>
        <td>{{ c.CreatedAt | date: "longDate" }}</td>
        <td>
          <p
            [class.active]="c.inCenema == true ? 'active' : 'inactive'"
            [textContent]="c.inCenema == true ? 'Active' : 'In-Active'"
          ></p>
        </td>
        <td>{{ c.description | summary: 20 | multi | bid }}</td>
        <td>
          <!--<i [ngClass]="'fa fa-star'"></i>-->
          <fstar (change)="onClickChanged($event)"></fstar>
        </td>
        <td>
          <like
            [selected]="MakeFavourite"
            (likeme)="onLikedClick($event)"
          ></like>
        </td>
        <td>
          <a
            (click)="onHit($event, c.id)"
            [href]="'edit.htm?id=' + c.id"
            class="btn btn-info"
            >Edit {{ c.name }}</a
          >
          <a class="btn btn-danger" (click)="deleteSingle(c.id)">Delete</a>
        </td>
      </tbody>
      <tfoot>
        <tr>
          <td [attr.colspan]="colspan">
            <button class="btn btn-success btn-block">{{ MovieName }}</button>
          </td>
          <td [attr.colspan]="colsp">
            <button class="btn btn-primary" (click)="clear($event)">
              Clear All
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    <hr />

    <prd
      [kind]="button"
      [className]="btn - primary"
      [isEnabled]="krd"
      (change)="handleClick()"
    ></prd>
    <hr />
    <input
      type="text"
      name="titleCase"
      class="form-control"
      [(ngModel)]="titleCase"
    />
    <hr />
    <h1>{{ titleCase | titleCase }}</h1>
    <hr />
    <b-panel class="header"></b-panel>
  `
})
export class CoursesComponent {
  private listOfMovie;
  private NameType;
  private MovieName: string;
  private MovieGene: MovieGenerator;
  private vClass: string;
  private titleCase: string;
  krd: Boolean = false;
  constructor() {
    this.MovieGene = new MovieGenerator();
    // mv.generate(20);
    this.listOfMovie = this.MovieGene.getMovies();
  }
  title = 'List Of Courses';
  course = ['course1', 'course2', 'course3', 'course4'];
  colspan = 2;
  colsp = 2;
  MakeFavourate = false;
  styleName = 'fa fa-star';
  // movies = this.listOfMovie.getAllMovies();
  onHit($event, id: any) {
    $event.preventDefault();
    console.log($event);
    console.log(`Button Clicked: ${id}`);
  }
  onLikedClick($event) {
    console.log($event);
  }

  handleClick() {
    console.log(this.krd);
    this.krd = !this.krd;
  }
  focus(name) {
    this.MovieName = name;
  }
  typeName($event) {
    this.NameType = $event.target.value;
  }
  generateId($event) {
    let idk = new RandomGenerator();
    this.NameType = idk.generateIdUpdate(16);
  }

  deleteSingle(id: any) {
    let product = this.listOfMovie.filter(p => p.id != id);
    this.listOfMovie = product;
  }

  onClickChanged($event) {
    console.log('onclick changed event emitted', $event);
  }

  addew(name, price, rate, id, ince, desc) {
    /*
    if (id == "" || id == null) {
      this.vClass = "valid";
    } else {
      */

    this.MovieName = name;
    this.MovieGene.insert(id, name, price, rate, ince, desc);
    //  }
  }
  clear($event) {
    console.log($event.target);
    let emptyProuct = this.listOfMovie.splice(0, this.listOfMovie.length - 1);

    this.listOfMovie = emptyProuct;
  }

  styleObject() {
    if (this.vClass.toLowerCase() == 'valid') {
      return {
        border: '2px solid red'
      };
    }
  }
}
