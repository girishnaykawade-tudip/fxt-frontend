import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { companyRegister } from './company-register-form.component';
import { routing }       from './company-register-form.routing';
import { RlTagInputModule } from 'angular2-tag-input';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    RlTagInputModule
  ],
  declarations: [
    companyRegister
  ]
})
export default class RegisterModule {}
