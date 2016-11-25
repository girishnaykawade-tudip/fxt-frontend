import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module.ts';

import { Forgot } from '../forgot/forgot.component.ts';
import { routing }       from '../forgot/forgot.routing.ts';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    BrowserModule,
    routing
  ],
  declarations: [
    Forgot
  ]
})
export default class ForgotModule {}
