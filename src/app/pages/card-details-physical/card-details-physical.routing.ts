import { Routes, RouterModule }  from '@angular/router';

import { CardDetailsPhysical } from './card-details-physical.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CardDetailsPhysical
  }
];

export const routing = RouterModule.forChild(routes);
