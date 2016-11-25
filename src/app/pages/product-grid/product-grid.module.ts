import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {ProductGrid} from './product-grid.component';
import { routing }       from './product-grid.routing';
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
    ProductGrid
  ]
})

export default class ProductGridModule {}
