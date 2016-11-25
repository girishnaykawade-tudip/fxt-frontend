import { Routes, RouterModule }  from '@angular/router';

import { OrderReceipt } from './order-receipt.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OrderReceipt
  }
];

export const routing = RouterModule.forChild(routes);
