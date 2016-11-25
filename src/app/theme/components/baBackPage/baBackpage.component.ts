import {Component, ViewChild, HostListener, Input, ElementRef} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'ba-back-page',
  styles: [require('./baBackPage.scss')],
  template: `<i #baBackPage class="fa fa-angle-left back-top ba-back-page" title="Back"> </i>`
  // directives: [ROUTER_DIRECTIVES]
})
export class BaBackPage {

  // @Input() position:number = 400;
  // @Input() showSpeed:number = 500;
  // @Input() moveSpeed:number = 1000;

  @ViewChild('baBackPage') private _selector:ElementRef;

  constructor(private _location: Location) {
  }
  ngAfterViewInit () {
    // this._onWindowScroll();
  }

  @HostListener('click')
  _onClick():any{
    this._location.back();
  }

}
