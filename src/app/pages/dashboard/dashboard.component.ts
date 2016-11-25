import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationHelper} from '../../app.authentication.ts';
import { Router, ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})

export class Dashboard {

  constructor(private authentication: AuthenticationHelper, private router: Router) {
    if(this.authentication.isLoggedIn()){
      if(this.authentication.isAdmin()) {
        this.router.navigate(['pages/user-grid']);
      }else{
        this.router.navigate(['pages']);
      }
    }
  }

  public navigateTo():any{
    this.router.navigate(['pages/balance-details']);
  }
}
