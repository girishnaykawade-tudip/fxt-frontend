import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing }       from './idea.routing';
import { Idea } from './idea.component';
import { PostIdea } from './components/postIdea/postIdea.component';
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
    Idea,PostIdea
  ]
})
export default class IdeaModule {}
