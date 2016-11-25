import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from "../../app.user-services";
import { AuthenticationHelper } from "../../app.authentication";
import { Router, ActivatedRoute }       from '@angular/router';
import {EmailValidator} from "../../theme/validators/email.validator";
import {Utility} from "../../app.utility";


declare const FB:any;

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./login.scss')],
  template: require('./login.html'),
  providers: [UserService]
})

export class Login {
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public invalidInput:boolean = false;
  public loginError:string = "";
  userData: string;
  public name:any;
  constructor(fb:FormBuilder, private userService: UserService,public utility: Utility, private router: Router, private authentication: AuthenticationHelper) {

    // redirect the user to dashboard if user is already logged in

    if(this.authentication.isLoggedIn()){
      if(this.authentication.isAdmin()) {
        this.router.navigate(['pages/user-grid']);
      }else{
        this.router.navigate(['pages']);
      }
    }

     toastr.options = { positionClass: 'toast-top-right', }
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4), EmailValidator.validate])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    FB.init({
      appId      : '206075373139952',
      cookie     : false,  // enable cookies to allow the server to access
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.5
    });
  }

  public getUserName(){
    this.userService.getUserbytoken(this.authentication.getToken()).subscribe(
        data => this.setDetails(data),
        error =>  console.log(error)
    );
  }

  public setDetails(result){
    this.name = result[0].first_name;
    this.authentication.setRole(result[0].role);
  }


  public onSubmit(values:Object):void {
    this.submitted = true;
    this.invalidInput = false;
    if (this.form.valid) {
      // your code goes here
      this.data ={
        username: values.email,
        password: values.password
      };
      this.userService.userLogin(this.data).subscribe(
        data => this.loginSucces(data),
        error =>  this.loginFail(error)
      );
    }
  }

  public loginSucces(result) {
    if(result.status < 0){
      toastr.error(result.data.message);
      this.invalidInput = true;
      this.submitted = false;
      this.loginError = result.data.message;
    }else{
      this.authentication.setLoggedIn(result.data.auth_token);
      this.getUserName();
      if(result.data.role == "admin"){
        this.utility.setallData(result.data.allUsersData)
        toastr.success('Admin Logged In Successfully');
        this.router.navigate(['pages/user-grid']);
      }else{
        toastr.success('User Logged In Successfully');
        this.router.navigate(['pages']);
      }
    }
  }

  public loginFail(error){
    toastr.error(error.data.message);
      this.invalidInput = true;
      this.submitted = false;
      this.loginError = error.data.message;
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
  //
  // private resetFB(){
  //     FB.init({
  //     appId      : '206075373139952',
  //     cookie     : false,  // enable cookies to allow the server to access
  //     xfbml      : true,  // parse social plugins on this page
  //     version    : 'v2.7' // use graph api version 2.5
  //   });
  // }
}
