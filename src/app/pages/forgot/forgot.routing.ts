/**
 * Created by tudip on 6/9/16.
 */
import { Routes, RouterModule }  from '@angular/router';

import {Forgot} from "./forgot.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Forgot
  }
];

export const routing = RouterModule.forChild(routes);
