import { Component, Input, Output, ElementRef, Directive, Attribute, EventEmitter } from '@angular/core';



@Component({
    selector: 'fav',
    template: `
        <div  class="bg bg-success" (click)="getSelect()">
           <form name="formName" ngModel #formName="ngModel"  (ngSubmit)="getFormValue(formName)">
            <input ngModel type="text" minlength="20" name="username" #username="ngModel" required (blur)="getValue(username)" />
            <div class="alert alert-danger" *ngIf="!username.valid && username.touched">
                <span *ngIf="username.errors.required">username is required</span>
                <span *ngIf="username.errors.minlength">minimum length is twenty</span>
            </div>
            <input type="submit" value="submit" />
           </form>
        </div>

    `
})

export class FavouriteComponent {
    currentSelect = false;
    @Input('isSelected')isSelected: boolean;
    @Output() change = new EventEmitter();
    constructor(element: ElementRef, @Attribute('is-class') bgClass: string) {
        element.nativeElement.classList.add(bgClass);
    }



    getSelect() {
       this.currentSelect = !this.currentSelect;
    //        console.log("clicked")
       this.change.emit(this.currentSelect);

    }

    getValue(vl) {
        console.log(vl);
    }

    getFormValue(vl) {
        console.log(vl);
    }

}
