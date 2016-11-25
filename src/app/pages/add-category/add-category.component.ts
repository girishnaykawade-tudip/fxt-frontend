import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: 'add-category',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./add-category.scss')],
  template: require('./add-category.html'),
  providers: [UserService]
})
export class AddCategory {

  public form:FormGroup;

  public category_name:AbstractControl;
  public category_description:AbstractControl;
  public category_isActive:AbstractControl;


  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public data:any;
  public date:any;
  public limit:any;
  public id:any;

  constructor(fb:FormBuilder, private userService: UserService, private routes: ActivatedRoute ,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right' }

    if(this.routes.snapshot.queryParams['id']){
      this.id = this.routes.snapshot.queryParams['id'];
    }else{
      this.id = 'all';
    }
    this.getData(this.id);


    this.form = fb.group({
      'category_name': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'category_description': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'category_isActive':['', Validators.compose([Validators.required])],


    });

    this.category_name = this.form.controls['category_name'];
    this.category_description = this.form.controls['category_description'];
    this.category_isActive = this.form.controls['category_isActive'];
  }

  public getData(data):any{
    this.userService.getCategory(data).subscribe(
        data => this.setData(data),
        error =>  console.log('error')
    );
  }

  public setData(result) {
    if(Object.keys(result.data.data).length < 2){
        this.form.controls['category_name'].setValue(result.data.data[this.id].category_name);
        this.form.controls['category_description'].setValue(result.data.data[this.id].category_description);
        this.form.controls['category_isActive'].setValue(result.data.data[this.id].category_isActive);
    }
  }


  public onSubmit(values:Object):void {


    this.submitted = true;
    this.invalidInput = false;
    this.registerError = '';

    if (this.form.valid) {
      // your code goes here
      this.data ={
          category_description: values.category_description,
          category_name: values.category_name,
          category_isActive:values.category_isActive,


        edit : this.id
        // password: values.passwords.password
      };
      this.userService.addCategory(this.data).subscribe(
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
        console.log(result);
         this.router.navigate(['/pages/category-grid']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }


}
