import { Routes, RouterModule }  from '@angular/router';

import { UserGrid } from './user-grid.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserGrid
  }
];

export const routing = RouterModule.forChild(routes);
