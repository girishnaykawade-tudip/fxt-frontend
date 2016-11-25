import { Routes, RouterModule }  from '@angular/router';

import { AddUser } from './add-user.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddUser
  }
];

export const routing = RouterModule.forChild(routes);
