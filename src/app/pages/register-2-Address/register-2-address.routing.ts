import { Routes, RouterModule }  from '@angular/router';

import { Register } from './register-2-address.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Register
  }
];

export const routing = RouterModule.forChild(routes);
