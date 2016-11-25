import { Routes, RouterModule }  from '@angular/router';

import { UserDetails } from './user-details.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserDetails
  }
];

export const routing = RouterModule.forChild(routes);
