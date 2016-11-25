import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {BaCardBlur} from './baCardBlur.directive';
import { UserService } from "../../../app.user-services";
import { AuthenticationHelper } from "../../../app.authentication";
import { Router, ActivatedRoute }       from '@angular/router';
import { Utility } from "../../../app.utility";

@Component({
  selector: 'ba-card',
  styles: [require('./baCard.scss')],
  directives: [BaCardBlur],
  template: require('./baCard.html'),
  encapsulation: ViewEncapsulation.None,
  providers: [UserService]
})
export class BaCard {
  @Input() title:number;
  @Input() baCardClass:String;
  @Input() cardtype:String;
  @Input() cardInital:String;
  @Input() cardRate:number;

  constructor( private userService: UserService, private router: Router, private authentication: AuthenticationHelper, private utility : Utility) {
  }

  public navigate(Event): any{
    this.authentication.setCard(Event);
    // this.utility.naviagatepostData(this.authentication.getCard());
    this.router.navigate(['pages/add-to-cart']);
  }

}
