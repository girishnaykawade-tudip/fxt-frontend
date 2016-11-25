import { Routes, RouterModule }  from '@angular/router';

import { CardDetails } from './card-details.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CardDetails
  }
];

export const routing = RouterModule.forChild(routes);
