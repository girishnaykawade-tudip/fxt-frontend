import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";


@Component({
  selector: 'card-details-physical',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./card-details.scss')],
  template: require('./card-details.html'),
  providers: [UserService]
})
export class CardDetailsPhysical {

  public form:FormGroup;
  public proxy_number:AbstractControl;
  public userId:AbstractControl;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public data:any;
  public date:any;
  public id:any;

  constructor(fb:FormBuilder, private userService: UserService, private routes: ActivatedRoute ,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
    if(this.routes.snapshot.queryParams['id']){
      this.id = this.routes.snapshot.queryParams['id'];
    }else{
      this.id = 'all';
    }
    this.getData(this.id);

    this.form = fb.group({
      'proxy_number': ['', ([Validators.minLength(0),Validators.maxLength(15),NumberValidator.validate])],
      'userId': ['', ([Validators.minLength(0),Validators.maxLength(12),NumberValidator.validate])],
    });
    this.proxy_number = this.form.controls['proxy_number'];
    this.userId = this.form.controls['userId'];
  }



    public getData(data):any{
        this.userService.getCards(data).subscribe(
        data => this.setData(data),
        error =>  console.log('error')
    );
  }

  public setData(result) {
    if(Object.keys(result.data.data).length < 2){
      console.log(result.data.data[1].proxy_number);
        this.form.controls['proxy_number'].setValue(result.data.data[1].proxy_number);
        this.form.controls['userId'].setValue(result.data.data[1].user_id);
      }
  }


  public onSubmit(values:Object):void {

    this.submitted = true;
    this.invalidInput = false;
    this.registerError = '';

    if (this.form.valid) {
      // your code goes here
      this.data ={
        firstName: values.firstname,
        bdate: values.bdate,
        rut: values.rut,
        nationality: values.nationality,
        address: values.address,
        phoneNumber: values.phoneNumber,
        passport: values.passport,
        ext: values.ext,
        email: values.email,
        edit : this.id
      };
      console.log(this.data);
      // this.userService.userSignup(this.data).subscribe(
      //   data => this.registerSucces(data),
      //   error =>  this.registerFail(error)
      // );
    }
  }

  public registerSucces(result) {
    if(result.status < 0){
      toastr.error(result.data.message);
      this.submitted = false;
      this.invalidInput = true;
      this.registerError = result.data.message;
    }else {
      toastr.success(result.data.message);
      this.router.navigate(['/pages/card-details']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

  // public onFacebookLoginClick() {
  //   FB.login(
  //     (response) => {
  //       this.statusChangeCallback(response);
  //     }
  //   );
  // }
  //
  // public statusChangeCallback(resp) {
  //   if (resp.status === 'connected') {
  //     // connect here with your server for facebook login by passing access token given by facebook
  //     let data = { token :  resp.authResponse.accessToken };
  //     this.userService.facebookLogin(data).subscribe(
  //       data => this.loginSucces(data),
  //       error =>  this.loginFail(error)
  //     );
  //
  //   }else if (resp.status === 'not_authorized') {
  //     this.resetFB();
  //     toastr.error("Facebook has denied authentication, please try again");
  //   }else {
  //     this.resetFB();
  //     toastr.error("Canceled by user, please try again");
  //   }
  // }
  //
  // private resetFB(){
  //   FB.init({
  //     appId      : '206075373139952',
  //     cookie     : false,  // enable cookies to allow the server to access
  //     xfbml      : true,  // parse social plugins on this page
  //     version    : 'v2.7' // use graph api version 2.5
  //   });
  // }
}
