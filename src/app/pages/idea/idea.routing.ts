import { Routes, RouterModule }  from '@angular/router';

import { Idea } from './idea.component';
import { PostIdea } from './components/postIdea/postIdea.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'idea',
    component: Idea,
    children: [
      { path: 'postIdea', component: PostIdea }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
