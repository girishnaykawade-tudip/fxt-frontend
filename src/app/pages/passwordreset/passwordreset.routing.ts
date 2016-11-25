/**
 * Created by tudip on 7/9/16.
 */
/**
 * Created by tudip on 6/9/16.
 */
import { Routes, RouterModule }  from '@angular/router';

import {Passwordreset } from './passwordreset.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Passwordreset
  }
];

export const routing = RouterModule.forChild(routes);
