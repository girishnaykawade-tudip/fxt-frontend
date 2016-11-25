import { Routes, RouterModule }  from '@angular/router';

import { InviteSubcontractors } from './invite-subcontractors.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: InviteSubcontractors
  }
];

export const routing = RouterModule.forChild(routes);
