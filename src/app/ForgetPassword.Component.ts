import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'prd',
  template: `
    <div>
      <button

        [ngClass] = "className"
        type="kind"
        (click)="toggle()"
      >
        Forget Password
      </button>
    </div>
  `
})
export class ForgetPasswordComponent {
  @Input()
  isEnabled: Boolean = true;
  @Input()
  className: String;
  @Input()
  kind: String;

  stlobj = {
    isEnabled: this.isEnabled == true ? 'enabled' : 'disabled'
  };

  ctlobj = {

  };

  @Output()
  change = new EventEmitter();
  constructor() {}

  toggle() {
      console.log('clicked');
      this.isEnabled = !this.isEnabled;
      this.change.emit();
  }
}
