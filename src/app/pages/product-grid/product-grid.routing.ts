import { Routes, RouterModule }  from '@angular/router';

import { ProductGrid } from './product-grid.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductGrid
  }
];

export const routing = RouterModule.forChild(routes);
