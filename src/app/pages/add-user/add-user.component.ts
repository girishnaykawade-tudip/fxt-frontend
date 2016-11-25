import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import { CardDetails } from "../card-details/card-details.component"

@Component({
  selector: 'add-user',
  encapsulation: ViewEncapsulation.None,
  directives: [CardDetails],
  styles: [require('./add-user.scss')],
  template: require('./add-user.html'),
  providers: [UserService]
})
export class AddUser {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  // public passwords:FormGroup;
  public firstname:AbstractControl;
  public lastname:AbstractControl;
  public bdate:AbstractControl;
  public rut:AbstractControl;
  public address:AbstractControl;
  public phoneNumber:AbstractControl;
  public passport:AbstractControl;
  public nationality:AbstractControl;
  public ext:AbstractControl;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public data:any;
  public date:any;
  public id:any;

  constructor(fb:FormBuilder, private userService: UserService, private routes: ActivatedRoute ,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
    this.date = new Date();
    // console.log(Object.keys(this.routes.snapshot.queryParams).length);
    if(this.routes.snapshot.queryParams['id']){
      this.id = this.routes.snapshot.queryParams['id'];
    }else{
      this.id = 'all';
    }
    this.getData(this.id);

    this.form = fb.group({
      'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'bdate': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'rut': ['', Validators.compose([Validators.required, Validators.minLength(11),])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(2) CharacterValidator.validate])],
      'nationality': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(14),])],
      'passport': ['', Validators.nullValidator([Validators.minLength(0),Validators.maxLength(12),NumberValidator.validate])],
      'email': ['', Validators.compose([Validators.required,Validators.minLength(4), EmailValidator.validate])],
      // 'passwords': fb.group({
      //   'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      //   'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      // }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.firstname = this.form.controls['firstname'];
    this.bdate = this.form.controls['bdate'];
    this.rut = this.form.controls['rut'];
    this.nationality = this.form.controls['nationality'];
    this.address = this.form.controls['address'];
    this.phoneNumber = this.form.controls['phoneNumber'];
    this.passport = this.form.controls['passport'];
    this.ext = this.form.controls['ext'];
    this.email = this.form.controls['email'];
      // FB.init({
      //   appId      : '206075373139952',
      //   cookie     : false,  // enable cookies to allow the server to access
      //   xfbml      : true,  // parse social plugins on this page
      //   version    : 'v2.7' // use graph api version 2.5
      // });
  }

  public getData(data):any{
    this.userService.getUsers(data).subscribe(
        data => this.setData(data),
        error =>  console.log('error')
    );
  }

  public setData(result) {
    if(Object.keys(result.data.data).length < 2){
        this.form.controls['firstname'].setValue(result.data.data[this.id].first_name);
        this.form.controls['email'].setValue(result.data.data[this.id].email);
        this.form.controls['nationality'].setValue(result.data.data[this.id].nationality);
        this.form.controls['bdate'].setValue(result.data.data[this.id].bdate);
        this.form.controls['phoneNumber'].setValue(result.data.data[this.id].phoneNumber);
        this.form.controls['address'].setValue(result.data.data[this.id].address);
        this.form.controls['rut'].setValue(result.data.data[this.id].rut);
        this.form.controls['passport'].setValue(result.data.data[this.id].passport);
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
        // lastName: values.lastname,
        bdate: values.bdate,
        rut: values.rut,
        nationality: values.nationality,
        address: values.address,
        phoneNumber: values.phoneNumber,
        passport: values.passport,
        ext: values.ext,
        email: values.email,
        edit : this.id
        // password: values.passwords.password
      };
console.log(this.data);
      this.userService.userSignup(this.data).subscribe(
        data => this.registerSucces(data),
        error =>  this.registerFail(error)
      );
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
      this.router.navigate(['/pages/user-grid']);
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
