import { Routes, RouterModule }  from '@angular/router';

import { Cards } from './cards.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Cards
  }
];

export const routing = RouterModule.forChild(routes);
