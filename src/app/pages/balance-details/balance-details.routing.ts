import { Routes, RouterModule }  from '@angular/router';

import { BalanceDetails } from './balance-details.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: BalanceDetails
  }
];

export const routing = RouterModule.forChild(routes);
