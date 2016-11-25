import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }       from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: ['forgot'],
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./../login/login.scss')],
  template: require('./forgot.html'),
  providers: [UserService],

})

export class Forgot {

  public form:FormGroup;
  public email:AbstractControl;
  public submitted:boolean = false;
  public forgotError:string = '';
  public invalidInput:boolean = false;
  userData: string;

  constructor(fb:FormBuilder, private userService: UserService,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
     this.invalidInput = false;
     this.forgotError = '';
    this.data ={
      email: values.email
    }
    this.userService.userForgot(this.data).subscribe(
      data =>this.forgotEmailSucces(data),
      error => this.forgotEmailFail(error));
  }

    public forgotEmailSucces(result) {
    this.router.navigate(['login']);
     toastr.success('You can reset your password by clicking on mail link');
  }

  public forgotEmailFail(error){
      toastr.error(error.message);
      this.invalidInput = true;
      this.submitted = false;
      this.forgotError = error.message;
  }


}
