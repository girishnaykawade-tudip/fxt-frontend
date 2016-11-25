import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {UserGrid} from './user-grid.component';
import { routing }       from './user-grid.routing';
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
    UserGrid
  ]
})

export default class UserGridModule {}
