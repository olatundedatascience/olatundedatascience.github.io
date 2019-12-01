import { Component } from '@angular/core';

@Component({
  selector: 'tif',
  styleUrls: ['./direct.css'],
  template: `
     <ul [ngStyle]="styobj">
      <li>
        <a class="btn btn-primary" (click)="switchCase('taglist')">Tags List</a>
      </li>
      <li>
        <a class="btn btn-success" (click)="switchCase('newtag')"
          >Add New Tags</a
        >
      </li>
    </ul>
    <br />
    <div [ngSwitch]="viewMode" [ngStyle]="divobj">
      <div *ngSwitchCase="'taglist'">
        <ul *ngFor="let k of Tags">
        <ng-template [ngIf]="Tags.length > 0">
          <li>{{ k }} | <a class="btn btn-danger" (click)="delete(k)">Delete</a></li>
          </ng-template>
          <ng-template [ngIf]="!(Tags.length > 0)">
                <h3>No Tags </h3>
          </ng-template>
        </ul>
      </div>
      <div *ngSwitchCase="'newtag'">
        <h2>Add New tag</h2>
        <form>
          <label>Tag Name</label>
          <input type="text" #tgname class="form-control" elik  elik-class="focused"/>
          <hr />
          <input
            type="button"
            value="Add New Tag"
            (click)="addtag(tgname.value)"
            class="btn btn-primary"
          />
        </form>
        <h1 style="color:red">{{ formResponse }}</h1>
      </div>
      <div *ngSwitchDefault>others</div>
      <a class="btn btn-danger" (click)="clearAll()">Clear All</a>
    </div>
  `
})
export class TestIfComponent {

  constructor() {
    this.Tags = ['tags1', 'tags2', 'tags3'];
    this.isEmpty = this.Tags.length > 0;
  }
  private Tags: Array<String>;
  isEmpty: boolean;
  viewMode = 'taglist';
  formResponse: String;

  divobj = {
    position: 'relative',
    left: '30%',
    border: '2px solid red',
    width: '50%',
    height: '50%'
  };

  styobj = {
    float: 'left',
    'list-style': 'none',
    padding: '10px'
  };

  clearAll() {
      let em = [];

      this.Tags = em;
  }

  delete(k: String) {
      let em = this.Tags.filter((v) => v != k);
      this.Tags = em;
  }

  switchCase(obj) {
    this.viewMode = obj;
  }

  addtag(tagname: String) {
    if (this.Tags.indexOf(tagname) > -1) {
      this.formResponse = 'tag alredy exist';
    } else {
      this.Tags.push(tagname);
      this.switchCase('taglist');
    }
  }
}
