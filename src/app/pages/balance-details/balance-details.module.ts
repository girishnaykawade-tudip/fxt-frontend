import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {BalanceDetails} from './balance-details.component';
import { routing }       from './balance-details.routing';
// import {DataTableModule} from "angular2-datatable";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    BalanceDetails
  ]
})

export default class BalanceDetailsModule {}
