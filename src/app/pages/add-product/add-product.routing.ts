import { Routes, RouterModule }  from '@angular/router';

import { AddProduct } from './add-product.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddProduct
  }
];

export const routing = RouterModule.forChild(routes);
