/**
 * Created by tudip on 7/9/16.
 */
/**
 * Created by tudip on 6/9/16.
 */
import { Routes, RouterModule }  from '@angular/router';

import { SetPassword } from './setPassword.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SetPassword
  }
];

export const routing = RouterModule.forChild(routes);
