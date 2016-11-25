import { Routes, RouterModule }  from '@angular/router';

import { Addtocart } from './add-to-cart.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Addtocart
  }
];

export const routing = RouterModule.forChild(routes);
