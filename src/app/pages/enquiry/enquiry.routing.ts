import { Routes, RouterModule }  from '@angular/router';

import { Enquiry } from './enquiry.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Enquiry
  }
];

export const routing = RouterModule.forChild(routes);
