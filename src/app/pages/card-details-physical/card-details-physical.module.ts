import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CardDetailsPhysical } from './card-details-physical.component';
import { routing }       from './card-details-physical.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CardDetailsPhysical
  ]
})

export default class CardDetailsPhysicalModule {}
