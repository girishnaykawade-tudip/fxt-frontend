import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationHelper} from "../app.authentication";
import {Router} from "@angular/router";

@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  directives: [  ],
  styles: [],
  template: `
    <ba-page-top-main></ba-page-top-main>
    <div class="">
      <div class="" > 
        <!--<ba-content-top></ba-content-top>-->
        <router-outlet></router-outlet>
      </div>
    </div>
    <!--<footer class="al-footer clearfix"></footer>-->
    <!--<ba-back-top position="200"></ba-back-top>-->
    `
})
export class Pages {

  constructor(private authentication: AuthenticationHelper, private router: Router) {
    if(!this.authentication.isLoggedIn()){
      this.router.navigate(['welcome']);
    }
    // if(this.authentication.isLoggedIn()){
    //   if(!this.authentication.isAdmin()) {
    //     this.router.navigate(['pages']);
    //     }else{
    //     this.router.navigate(['pages/user-grid']);
    //   }
    // }
  }

  ngOnInit() {
  }
}
