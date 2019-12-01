import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'like',
    templateUrl: './like.component.html'
})
export class likeComponent {
    @Input()
    selected = false;

    @Output('likeme')
    likedEvent = new EventEmitter();

    onLiked() {
        this.selected = !this.selected;
        this.likedEvent.emit(this.selected);

    }
}
