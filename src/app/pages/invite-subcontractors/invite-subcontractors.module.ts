import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { InviteSubcontractors } from './invite-subcontractors.component';
import { routing }       from './invite-subcontractors.routing';
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
    InviteSubcontractors
  ]
})
export default class RegisterModule {}
