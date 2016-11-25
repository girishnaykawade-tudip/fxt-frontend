import { Component, ViewEncapsulation } from '@angular/core';
import {CKEditor} from 'ng2-ckeditor';
import './ckeditor.loader.ts';
import { UserService } from "../../../../app.user-services";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'ckeditor-component',
  encapsulation: ViewEncapsulation.None,
  directives: [CKEditor],
  template: require('./ckeditor.html'),
  styles: [require('./ckeditor.scss')],
  providers: [UserService]
})

export class Ckeditor {

  public config = {
    uiColor: '#eff3f6',
    height: '600'
  };
  constructor(private userService: UserService) {
    this.ckeditorContent='';
  }

  public onSubmit(title,content):void {

    //this.toastr.success('You are awesome!', 'Success!');
    this.data ={

      title: title,
      content:content,
      tags:this.tags
    }
    this.userService.userIdea(this.data).subscribe(
      data => this.userData = JSON.stringify(data),
      error =>  console.log("ERROR"));
    // this.router.navigate(['pages']);
    //if (this.form.valid) {
    // your code goes here
    // if(values.email == this.user.username && values.password == this.user.password) {
    //   alert("successfull");
    // }
    // else {
    //   alert("Failed");
    // }
    //}
  }
}
