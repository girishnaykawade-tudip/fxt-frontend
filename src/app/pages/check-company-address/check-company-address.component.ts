import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: 'showCompanyAddress',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./check-company-address.scss')],
  template: require('./check-company-address.html'),
  providers: [UserService]
})

export class Register {

  public submitted:boolean = false;
  public form:FormGroup;
  public companyData:Object;

  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', };

    FB.init({
      appId      : '206075373139952',
      cookie     : false,  // enable cookies to allow the server to access
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.7' // use graph api version 2.5
    });

  }

 ngOnInit(){
   this.companyData = JSON.parse(localStorage.getItem('companyInfo'));
   console.log(this.companyData.data.id_company);
 }

  public onSubmit(values:Object):void {
      this.submitted = true;
      this.data ={
        id_company: this.companyData.data.id_company
      };

      this.userService.saveUserInCompany(this.data).subscribe(
        data => this.registerSuccess(data),
        error =>  this.registerFail(error)
      );
  }

  public registerSuccess(result) {
      toastr.success(result.data.message);
      localStorage.removeItem('companyInfo');
      this.router.navigate(['/pages/inviteSubcontractors']);
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

}
