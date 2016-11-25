import { Component, ViewEncapsulation } from '@angular/core';
import {CKEditor} from 'ng2-ckeditor';
import { UserService } from "../../../../app.user-services";
//import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import './postIdea.loader.ts';
import { Router, ActivatedRoute }       from '@angular/router';


@Component({
  selector: 'postIdea-component',
  encapsulation: ViewEncapsulation.None,
  directives: [CKEditor],
  template: require('./postIdea.html'),
  styles: [require('./postIdea.scss')],
  providers: [UserService]
})

export class PostIdea {

  public config = {
    uiColor: '#F0F3F4'
  };
  constructor(private userService: UserService, private router: Router) {
     toastr.options = { positionClass: 'toast-top-right', } 
    this.ckeditorContent='';
  }

  public onSubmit(title,content):void {
    this.data ={

      title: title,
      content:content,
      tags:this.tags
    }
    this.userService.userIdea(this.data).subscribe(
      data => this.IdeaPostedSucessfully(),
      error =>  this.IdeaPostedFail(error));
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

  private IdeaPostedSucessfully() {
  toastr.success("Idea posted successfully");
   this.router.navigate(['pages']);
  }

  private IdeaPostedFail(error){
    console.log("error",error.error_message);
    toastr.error(error.error_message);
  }
}
