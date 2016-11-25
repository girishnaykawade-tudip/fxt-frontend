import { Routes, RouterModule }  from '@angular/router';

import { CategoryGrid } from './category-grid.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CategoryGrid
  }
];

export const routing = RouterModule.forChild(routes);
