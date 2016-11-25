import { Routes, RouterModule }  from '@angular/router';

import { companyRegister } from './company-register-form.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: companyRegister
  }
];

export const routing = RouterModule.forChild(routes);
