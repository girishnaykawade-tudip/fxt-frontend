import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import { Utility } from "../../app.utility.ts";

@Component({
  selector: 'add-to-cart',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./add-to-cart.scss')],
  template: require('./add-to-cart.html'),
  providers: [UserService]
})

export class Addtocart {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public firstname:AbstractControl;
  public lastname:AbstractControl;
  public phoneNumber:AbstractControl;
  public ext:AbstractControl;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public Data : any;
  public cardRate : any;
  Data = new Array();

    constructor( private userService: UserService,public utility: Utility, private router: Router, private authentication: AuthenticationHelper) {
      this.userService.getCurrentCUrrencyRate().subscribe(
          data => this.setRate(data.quotes.USDCLP),
          error =>  console.log("Result", error)
      );
      this.getData();
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

  public saveData(Event):any{
    this.userService.saveCard(Event.Data).subscribe(
        data => this.paySucces(data),
        error =>  this.payFail(error)
    );
  }

  public order(Event){
    this.router.navigate(['/pages/order-receipt']);
  }

  public paySucces(result) {
    if(result.status < 0){
      toastr.error(result.data.message);
      this.submitted = false;
      this.invalidInput = true;
      this.registerError = result.data.message;
    }else {
     KhipuLib.startKhipu(result.data.data.url,result.data.data.id, result.data.data.ready_for_terminal);
    }
  }

  public payFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
    this.invalidInput = true;
    this.registerError = error.data.message;
  }

}
