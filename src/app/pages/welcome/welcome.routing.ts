import { Routes, RouterModule }  from '@angular/router';

import { Welcome } from './welcome.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Welcome
  }
];

export const routing = RouterModule.forChild(routes);
