import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";


@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [],
  template: require('./register.html'),
  providers: [UserService]
})
export class Register {

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
  public date: any;

  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
      this.date = new Date();
    this.form = fb.group({
      'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'bdate': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'rut': ['', Validators.compose([Validators.required, Validators.minLength(11),])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nationality': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(14),])],
      'passport': ['', Validators.nullValidator([Validators.minLength(0),])],
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
    // this.passwords = <FormGroup> this.form.controls['passwords'];
    // this.password = this.passwords.controls['password'];
    // this.repeatPassword = this.passwords.controls['repeatPassword'];

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
        edit: 'all'
        // password: values.passwords.password
      };

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
      toastr.success('User registered successfully');
        // this.firstname.patchValue('');
        location.reload();
      // this.router.navigate(['welcome']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

  public onFacebookLoginClick() {
    FB.login(
      (response) => {
        this.statusChangeCallback(response);
      }
    );
  }

  public statusChangeCallback(resp) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
      let data = { token :  resp.authResponse.accessToken };
      this.userService.facebookLogin(data).subscribe(
        data => this.loginSucces(data),
        error =>  this.loginFail(error)
      );

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
