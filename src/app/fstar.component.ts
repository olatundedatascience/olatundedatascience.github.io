import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
    selector: 'fstar',
    templateUrl: './fstar.html'
})
export class fstarComponent implements OnInit {
@Input('isSelected')
isSelected: boolean;

@Output()
change = new EventEmitter();
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

onClick() {
    this.isSelected = !this.isSelected;
    this.change.emit(this.isSelected);

}





}
