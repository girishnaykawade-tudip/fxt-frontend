import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from "../../app.user-services";
import { AuthenticationHelper } from "../../app.authentication";
import { Router, ActivatedRoute }       from '@angular/router';

// declare const FB:any;

@Component({
  selector: 'cards',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./cards.scss')],
  template: require('./cards.html'),
  providers: [UserService]
})

export class Cards {

  public card_type: string;
  public type: string;
  public curr: number;
  fakeArray = new Array('5000', '10000', '20000', '30000', '50000',
      '100000', '250000', '500000', '1000000');

  constructor(private router: ActivatedRoute, private userService: UserService,  private authentication: AuthenticationHelper){
     this.card_type = this.router.snapshot.queryParams['product_cat'];
    if(this.card_type == 'Virtual'){
      this.type = 'V';
    }else{
      this.type = 'F';
    }

    this.userService.getCurrentCUrrencyRate().subscribe(
        data => this.currencyCalc(data.quotes.USDCLP),
        error =>  console.log("Result", error)
    );
    this.authentication.removeCard();
  }


  public currencyCalc(result) {
    this.curr = result * 1.050;
  }

}
