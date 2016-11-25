import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule} from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { routing }       from './editors.routing';
import { Editors } from './editors.component';
import { Ckeditor } from './components/ckeditor/ckeditor.component';
import {RlTagInputModule} from 'angular2-tag-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    RlTagInputModule,
    routing
  ],
  declarations: [
    Editors,
    Ckeditor
  ]
})
export default class EditorsModule {}
