import { Routes, RouterModule }  from '@angular/router';

import { AddCategory } from './add-category.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddCategory
  }
];

export const routing = RouterModule.forChild(routes);
