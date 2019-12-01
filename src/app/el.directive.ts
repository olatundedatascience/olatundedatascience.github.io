import { Directive, ElementRef, HostListener, Attribute } from '@angular/core';

@Directive({
  selector: '[elik]'
})
export class el {
  constructor(private element: ElementRef, @Attribute('elik-class') private bgClass: String) {}

  @HostListener('focus')
  onFocus() {
    console.log('focused');
    let vl: String = this.element.nativeElement.value;
    this.element.nativeElement.value = vl.toUpperCase();
    this.element.nativeElement.classList.add(this.bgClass || 'bg-success');
  }
}
