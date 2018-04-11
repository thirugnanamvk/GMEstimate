import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberType]'
})
export class NumberTypeDirective {

  constructor(public el: ElementRef) {

    this.el.nativeElement.onkeypress = (evt) => {
      if ((evt.which < 48 || evt.which > 57)
      && evt.which != 8
      && evt.which != 190
      && evt.which != 46
      && evt.which != 37
      && evt.which != 38
      && evt.which != 39
      && evt.which != 40
      && evt.which != 9) {
        evt.preventDefault();
      }
    };
  }
}
