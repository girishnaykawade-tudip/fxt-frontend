import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, NumberValidator, CharacterValidator} from '../../theme/validators';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";


@Component({
  selector: 'companyRegister',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./company-register-form.scss')],
  template: require('./company-register-form.html'),
  providers: [UserService]
})

export class companyRegister {

  public form:FormGroup;
  public stateTag:AbstractControl;
  public invalidInput:boolean = false;
  public fileUploaded:boolean = false;
  public submitted:boolean = false;
  public registerError:string = '';
  public constructionList:Array = [];
  public projectTypeList:Array = [];
  public constructionSector:AbstractControl;
  public projectType:AbstractControl;
  public companyName:AbstractControl;
  public companyDesc:AbstractControl;
  public fileName:string = '';
  public constructionSectorSelected:boolean = false;
  public companyData:Object ='';
  public logoName:string = '';


  constructor(fb:FormBuilder, private userService: UserService, private router: Router, private authentication: AuthenticationHelper) {
    toastr.options = {positionClass: 'toast-top-right',};
    this.form = fb.group({
      'stateTag': ['', Validators.compose([Validators.required])],
      'companyDesc': ['', Validators.compose([Validators.required])],
      'companyName': ['', Validators.compose([Validators.required])],
      'projectType': ['Choose', Validators.compose([Validators.required])],
      'constructionSector': ['Choose', Validators.compose([Validators.required])]
    });

    this.stateTag = this.form.controls['stateTag'];
    this.companyDesc = this.form.controls['companyDesc'];
    this.companyName = this.form.controls['companyName'];
    this.projectType = this.form.controls['projectType'];
    this.constructionSector = this.form.controls['constructionSector'];

    FB.init({
      appId: '206075373139952',
      cookie: false,  // enable cookies to allow the server to access
      xfbml: true,  // parse social plugins on this page
      version: 'v2.7' // use graph api version 2.5
    });
  }

  public defaultPicture = 'assets/img/icon-upload.svg';
  public profile:any = {
    picture: ''
  };
  public uploaderOptions:any = {
      url: 'http://api.planhub.com/api/v1/uploadLogo',
      fieldName: 'logo',
      customHeaders: { 'Authorization': 'auth_token ' + this.authentication.getToken() },
      filterExtensions:	true,
      allowedExtensions:	['jpg', 'png','jpeg']
  };

  public onSubmit(values:Object):void {

    if(values.constructionSector != 'Choose' && values.projectType != 'Choose' && document.getElementById('projectType').value !='') {
      this.submitted = true;
      this.invalidInput = false;
      this.registerError = '';
      if (this.form.valid) {
        this.companyData = JSON.parse(localStorage.getItem('companyInfo'));
        values.stateTag = values.stateTag.toString();  // convert the stateTag array into comma separated string
        this.logoName = localStorage.getItem('company_logo');
        localStorage.removeItem('company_logo');
        // your code goes here

        this.data = {
          companyName: values.companyName,
          description: values.companyDesc,
          stateCovered: values.stateTag,
          constructionSector: values.constructionSector,
          projectTypes: values.projectType,
          logo: this.logoName,
          lat: this.companyData.data.latlng.lat,
          lng: this.companyData.data.latlng.lng,
          address: this.companyData.data.companyAddress.address,
          state: this.companyData.data.companyAddress.state,
          city: this.companyData.data.companyAddress.city,
          zipcode: this.companyData.data.companyAddress.zipcode
        };

        this.userService.companySignUp(this.data).subscribe(
          data => this.registerSuccess(data),
          error => this.registerFail(error)
        );
      }
    }else{
      toastr.error('Please select Project Types');
    }
  }

  public registerSuccess(result) {
    if(result.status < 0){
      toastr.error(result.data.message);
      this.submitted = false;
    }else{
      toastr.success(result.data.message);
      localStorage.removeItem('companyInfo');
      this.router.navigate(['/pages/inviteSubcontractors']);
    }
  }

  public registerFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
     this.invalidInput = true;
    this.registerError = error.data.message;
  }

  public constructionSectorList(result) {
     this.constructionList = result;
  }

  public getDataForConstruction(){
    this.userService.getConstructionSector().subscribe(
      data => this.constructionSectorList(data),
      error =>  this.registerFail(error)
    );
  }

  public onChange(constructionSectorId) {
    if(constructionSectorId != 'Choose') {
      this.submitted = false;
      this.data = {
        constructionType: constructionSectorId
      };

      this.userService.getProjectTypesOnBasedOfSector(this.data).subscribe(
        data => this.projectTypesOnBasedOfSector(data),
        error => this.registerFail(error)
      );
    }else{
      this.submitted = true;
      this.constructionSectorSelected = false;
    }
  }

  public projectTypesOnBasedOfSector(result){
    this.projectTypeList = result;
    this.constructionSectorSelected = true;
  }

  public autoFillStateList(stateText){
    this.data = {
      name :stateText
    };

    this.userService.getStateListOnKeyUp(this.data).subscribe(
      data => this.getAutoFillSearchList(data),
      error => this.registerFail(error)
    );
  }

  public getAutoFillSearchList(data){
    console.log(data);
  }

  ngOnInit() {
    this.getDataForConstruction();
  }
}
