import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: 'enquiry',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [],
  template: require('./enquiry.html'),
  providers: [UserService]
})
export class Enquiry {

  public form:FormGroup;
  public email:AbstractControl;
  public firstname:AbstractControl;
  public address:AbstractControl;
  public phoneNumber:AbstractControl;
  public message:AbstractControl;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public data:any;



  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', }
    this.form = fb.group({
      'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'message': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(14),])],
      'email': ['', Validators.compose([Validators.required,Validators.minLength(4), EmailValidator.validate])],
    });

    this.firstname = this.form.controls['firstname'];
    this.address = this.form.controls['address'];
    this.phoneNumber = this.form.controls['phoneNumber'];
    this.message = this.form.controls['message'];
    this.email = this.form.controls['email'];
  }

  public onSubmit(values:Object):void {

    this.submitted = true;
    this.invalidInput = false;
    this.registerError = '';

    if (this.form.valid) {
      // your code goes here
      this.data ={
        firstName: values.firstname,
        address: values.address,
        phoneNumber: values.phoneNumber,
        message: values.message,
        email: values.email
      };


      this.userService.enquirySave(this.data).subscribe(
        data => this.enquirySucces(data),
        error =>  this.enquiryFail(error)
      );
    }
  }

  public enquirySucces(result) {
    if(result.status < 0){
      toastr.error(result.data.message);
      this.submitted = false;
      this.invalidInput = true;
      this.registerError = result.data.message;
    }else {
      toastr.success('Enquiry Submitted!');
      location.reload();
    }
  }

  public enquiryFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

}

//Add regex for taking full name
// full Address and message


//sample
// {
// firstName":"Kunal",
// "address":"Mumbai",
// "phoneNumber":"(862) 581-4286",
// "message":"Hiallthisisusedfortesting",
// "email":"kunal.birhade@tudip.nl
// }