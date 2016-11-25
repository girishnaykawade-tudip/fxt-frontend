import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

@Component({
  selector: 'inviteSubcontractors',
  encapsulation: ViewEncapsulation.None,
  directives: [UPLOAD_DIRECTIVES],
  styles: [require('./invite-subcontractors.scss')],
  template: require('./invite-subcontractors.html'),
  providers: [UserService]
})

export class InviteSubcontractors {

  public form:FormGroup;
  public invalidInput:boolean = false;
  public submitted:boolean = false;
  public fileUploaded:boolean = false;
  public registerError:string = '';
  public subcontractorFile:AbstractControl;
  public fileName:string = '';
  public inviteSubcontractorEmail:AbstractControl;
  public validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public settings = {
    recipients: [],
    tags: ['one', 'two', 'three']
  };

  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = { positionClass: 'toast-top-right', };
    this.form = fb.group({
      'inviteSubcontractorEmail':['', Validators.compose([Validators.nullValidator])],
      'subcontractorFile':['', Validators.compose([Validators.nullValidator])]
    });

    this.inviteSubcontractorEmail = this.form.controls['inviteSubcontractorEmail'];
    this.subcontractorFile = this.form.controls['subcontractorFile'];
  }



  uploadFile: any;
  options: Object = {
    url: 'http://api.planhub.com/api/v1/uploadSubcontractors',
    fieldName: 'file',
    customHeaders: { 'Authorization': 'auth_token ' + this.authentication.getToken() },
    filterExtensions:	true,
    allowedExtensions:	['jpg', 'png','jpeg']
  };

  handleUpload(data): void {
    this.fileName = data.originalName;
    this.fileUploaded = true;
    if (data && data.response) {
      data = JSON.parse(data.response);
      if(data.status < 0){
        this.fileName = '';
        this.fileUploaded = false;
        toastr.error(data.data.message);
      }else{
        this.uploadFile = data;
        toastr.success(data.data.message);
      }
    }
  }

  public onSubmit(values:Object):void {
    this.invalidInput = false;
    this.registerError = '';

    if(this.fileUploaded || values.inviteSubcontractorEmail !='') {
      this.submitted = true;
      values.inviteSubcontractorEmail = values.inviteSubcontractorEmail.toString();
      this.data = {
        email: values.inviteSubcontractorEmail
      };

      this.userService.sendInviteToSubcontractors(this.data).subscribe(
        data => this.registerSuccess(data),
        error => this.registerFail(error)
      );
    }else{
      this.submitted = false;
      toastr.error('Please Upload file or Enter email to send invitation');
    }
  }

  public registerSuccess(result) {
    if(result.status < 0 ) {
      this.submitted = false;
      toastr.error('Email has already sent');
    }else{
      toastr.success('Email Sent Successfully');
      this.router.navigate(['pages']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
    this.invalidInput = true;
    this.registerError = error.data.message;
  }
}
