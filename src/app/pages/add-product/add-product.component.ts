import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";

@Component({
  selector: 'add-product',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./add-product.scss')],
  template: require('./add-product.html'),
  providers: [UserService]
})
export class AddProduct {

  public form:FormGroup;
  public product_name:AbstractControl;
  public product_description:AbstractControl;
  public product_price:AbstractControl;
  public SKU:AbstractControl;
  public category_id:AbstractControl;




  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public data:any;
  public category:any;
  public date:any;
  public id:any;
  public  categoryList= new Array();


    constructor(fb:FormBuilder, private userService: UserService, private routes: ActivatedRoute ,private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right' }
    if(this.routes.snapshot.queryParams['id']){
      this.id = this.routes.snapshot.queryParams['id'];
    }else{
      this.id = 'all';
    }
    this.getData(this.id);
    this.getallCategories('all');

    this.form = fb.group({
      'product_name': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'product_description': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'product_price': ['', Validators.compose([Validators.required, Validators.minLength(2), NumberValidator.validate])],
      'SKU': ['', Validators.compose([Validators.required, Validators.minLength(2), CharacterValidator.validate])],
      'category_id':['',Validators.compose([Validators.required])],
  });

    this.product_name = this.form.controls['product_name'];
    this.product_description = this.form.controls['product_description'];
    this.product_price = this.form.controls['product_price'];
    this.SKU = this.form.controls['SKU'];
    this.category_id = this.form.controls['category_id'];
  }

    public getallCategories(data):any{
        this.userService.getCategory(data).subscribe(
            data => this.setcategory(data),
            error =>  console.log('error')
        );
    }
        public setcategory(data){

            for (let i = 0; i <= data.data.count; i++) {
                if (data.data.data[i] != null) {
                    this.categoryList.push(data.data.data[i]);
                }
            }
            console.log(this.categoryList);

        }

    public getData(data):any{
    this.userService.getProduct(data).subscribe(
        data => this.setData(data),
        error =>  console.log('error')
    );
  }

  public setData(result) {
      console.log(result.data.data);
  if(Object.keys(result.data.data)){
        this.form.controls['product_name'].setValue(result.data.data[this.id].product_name);
        this.form.controls['product_description'].setValue(result.data.data[this.id].product_description);
        this.form.controls['product_price'].setValue(result.data.data[this.id].product_price);
        this.form.controls['SKU'].setValue(result.data.data[this.id].SKU);
        this.form.controls['category_id'].setValue(result.data.data[this.id].category_id);
//        this.form.controls['category_id'].selected(result.data.data[this.id].category_name);
 }
  }


  public onSubmit(values:Object):void {
      console.log(values);
    this.submitted = true;
    this.invalidInput = false;
    this.registerError = '';

    if (this.form.valid) {
      // your code goes here
      this.data ={
          product_name: values.product_name,
          product_description: values.product_description,
          product_price:values.product_price,
          SKU:values.SKU,
          category_id:values.category_id,

        edit : this.id
        // password: values.passwords.password
      };
      this.userService.addProduct(this.data).subscribe(
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
     // toastr.success(result.data.message);
        this.router.navigate(['/pages/product-grid']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

}
