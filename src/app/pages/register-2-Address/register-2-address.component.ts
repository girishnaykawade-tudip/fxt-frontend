import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: 'register2',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./register-2-address.scss')],
  template: require('./register-2-address.html'),
  providers: [UserService]
})
export class Register {

  public form:FormGroup;
  public address:AbstractControl;
  public stateName:AbstractControl;
  public city:AbstractControl;
  public zipcode:AbstractControl;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public invalidAddress:string = '';


  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', };
    this.form = fb.group({
      'address': ['', Validators.compose([Validators.required])],
      'stateName': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'zipcode': ['', Validators.compose([Validators.required])]
    });

    this.address = this.form.controls['address'];
    this.stateName = this.form.controls['stateName'];
    this.city = this.form.controls['city'];
    this.zipcode = this.form.controls['zipcode'];

    FB.init({
      appId      : '206075373139952',
      cookie     : false,  // enable cookies to allow the server to access
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.5
    });
  }

  public onSubmit(values:Object):void {

    this.submitted = true;
    this.invalidInput = false;
    this.invalidAddress = '';

    if (this.form.valid) {
      // your code goes here
      this.data ={
        address: values.address,
        state: values.stateName,
        city: values.city,
        zipcode: values.zipcode
      };

      this.userService.checkCompanyName(this.data).subscribe(
        data => this.checkCompanySuccess(data),
        error =>  this.checkCompanyFail(error)
      );
    }
  }

  public checkCompanySuccess(result) {
    if(result.status < 0){
        toastr.error(result.data.message);
        this.submitted = false;
        this.invalidInput = true;
        this.invalidAddress = result.data.message;
    }else{
      localStorage.setItem('companyInfo', JSON.stringify(result));  // set the company info in local storage
      if(result.data.code == 178 || result.data.code == 'Company does not exists') {
        this.router.navigate(['/pages/companyRegister']);
      }else{
        this.router.navigate(['/pages/showCompanyAddress']);
      }
    }
  }

  public checkCompanyFail(error){
    toastr.error(error.message);
    this.submitted = false;
     this.invalidInput = true;
    this.invalidAddress = error.message;
  }

  public statusChangeCallback(resp) {
    console.log(resp);
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
      let data = { token :  resp.authResponse.accessToken };
      this.userService.facebookLogin(data).subscribe(
        data => this.loginSucces(data),
        error =>  this.loginFail(error)
      );
      console.log("auth");
    }else if (resp.status === 'not_authorized') {
      this.resetFB();
      toastr.error("Facebook has denied authentication, please try again");
    }else {
      this.resetFB();
      toastr.error("Canceled by user, please try again");
    }
  }

  private resetFB(){
    FB.init({
      appId      : '206075373139952',
      cookie     : false,  // enable cookies to allow the server to access
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.5
    });
  }
}
