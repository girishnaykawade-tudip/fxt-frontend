import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from "../../app.user-services";
import { AuthenticationHelper } from "../../app.authentication";
import { Router, ActivatedRoute }       from '@angular/router';
import {EqualPasswordsValidator} from '../../theme/validators';
@Component({
  selector: ['setPassword'],
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./../login/login.scss')],
  template: require('./setPassword.html'),
  providers: [UserService],
})



export class SetPassword {

  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public submitted:boolean = false;
  public userResetPassUrl: any;
  public regex: any;
  public url: string;
  public params: Object;
  public match: string;
  public data: any;

  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
      if(this.authentication.isLoggedIn()){
          this.router.navigate(['pages']);
      }

      toastr.options = { positionClass: 'toast-top-right', }
      this.form = fb.group({
        'passwords': fb.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.regex=/[?&]([^=#]+)=([^&#]*)/g;
    this.url=window.location.hash.toString();
    this.params={};
    while(this.match = this.regex.exec(this.url)) {
      this.params[this.match[1]] = this.match[2];
    }

  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    var userId = decodeURIComponent(this.params.userid);
    this.data ={
      password: values.passwords.password,
      userId:userId
    };

    if (this.form.valid) {
      this.userService.setPassword(this.data).subscribe(
        data => this.loginSucces(data),
        error =>  this.loginFail(error)
      );
    }
  }

  public loginSucces(result) {
    if(result.status < 0){
      toastr.error(error.data.message);
      this.submitted = false;
    }else {
        this.authentication.setLoggedIn(result.data.auth_token);
        toastr.success('Password set successfully');
      this.router.navigate(['welcome']);
    }
  }

  public loginFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
    console.log(error);
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
      console.log("auth");
    }else if (resp.status === 'not_authorized') {
      console.log("not auth");
    }else {
      console.log("canceled by user")
    }
  }

  ngOnInit() {
       console.log(decodeURIComponent(this.params.userid));
  }
}
