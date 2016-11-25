import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import {Utility} from "../../app.utility";


@Component({
  selector: 'order-receipt',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./order-receipt.scss')],
  template: require('./order-receipt.html'),
  providers: [UserService]
})
export class OrderReceipt {

  public data:any;
  public id:any;
  public Data : any;
  public date : any;
  public cardRate : any;
  Data = new Array();

  constructor(fb:FormBuilder, private userService: UserService, private routes: ActivatedRoute, private utility:Utility ,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
    this.userService.getCurrentCUrrencyRate().subscribe(
        data => this.setRate(data.quotes.USDCLP),
        error =>  console.log("Result", error)
    );
    this.getData();
    this.date = new Date();
  }

  public setRate(Rate){
    this.cardRate = Rate;
    this.Data['param2'] = this.Data['param1']/(1.050*this.cardRate);
    this.utility.setallData(this.Data['param2']);
  }

  public getData():any{
    this.utility.naviagatepostData(this.authentication.getCard());
    this.Data = this.utility.getData();
  }

  public saveOrder(Event){
    this.userService.saveOrder(Event.Data).subscribe(
        data => this.orderSuccess(data),
        error =>  this.orderFail(error)
    );
  }

  public orderSuccess(result):any{
    if(result.status < 0){
      toastr.error(result.data.message);
      this.submitted = false;
      this.invalidInput = true;
      this.registerError = result.data.message;
    }else {
      toastr.success(result.data.message);
      this.router.navigate(['/pages/']);
    }

  }

  public orderFail(result):any{
    console.log(result);
  }
}
