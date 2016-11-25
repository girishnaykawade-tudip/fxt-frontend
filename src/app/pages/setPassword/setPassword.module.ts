/**
 * Created by tudip on 7/9/16.
 */
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module.ts';
import {BrowserModule} from '@angular/platform-browser';
import { SetPassword } from './setPassword.component';
import { routing }       from './setPassword.routing';


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
    SetPassword
  ]
})
export default class SetPasswordModule {}
