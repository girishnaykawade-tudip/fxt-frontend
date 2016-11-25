import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {BaProfilePicturePipe} from '../../pipes';
import {BaMsgCenter} from '../../components/baMsgCenter';
import {BaScrollPosition} from '../../directives';
import { UserService } from "../../../app.user-services";
import { AuthenticationHelper } from "../../../app.authentication";
import { Router, ActivatedRoute }       from '@angular/router';

@Component({
  selector: 'ba-page-top-main',
  styles: [require('./baPageTopMain.scss')],
  template: require('./baPageTopMain.html'),
  directives: [BaMsgCenter, BaScrollPosition],
  pipes: [BaProfilePicturePipe],
  encapsulation: ViewEncapsulation.None,
  providers: [UserService]
})
export class BaPageTopMain {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public name : any;

  constructor(private _state:GlobalState, private userService: UserService, private authentication: AuthenticationHelper) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.getUserName();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public getUserName(){
    this.userService.getUserbytoken(this.authentication.getToken()).subscribe(
        data => this.setDetails(data),
        error =>  console.log(error)
  );
  }

  public setDetails(result){
    this.name = result[0].first_name;
    this.authentication.setRole(result[0].role);
  }


  public logoutSession() {
    this.authentication.removeLoggedIn();
    localStorage.removeItem('companyInfo');
    toastr.success('Logout Successfully');
    let data = this.authentication.getToken();
    this.userService.userLogout(data).subscribe(
      data => this.logOutSuccess(data),
      error =>  this.logOutFail(error)
    );
  }

  public logOutSuccess(result) {
    if(result.status < 0){
      console.log("Logout Fail");
      console.log(error);
    }else {
      this.router.navigate(['welcome']);
    }
  }

  public logOutFail(error){
    console.log("Logout Fail");
    console.log(error);
  }


}
