import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { CategoryGrid } from './category-grid.component';
import { routing }       from './category-grid.routing';
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
      CategoryGrid
  ]
})

export default class CategoryGridModule {}
