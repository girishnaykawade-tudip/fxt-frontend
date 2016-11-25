import { Injectable , Inject} from '@angular/core';

@Injectable()
export class AuthenticationHelper {
  private tokenKey:string = "auth_token";
    private user:string = "user";
    private cardVal:any = "cardVal";
  constructor() {
  }
  isLoggedIn() {
     let token = localStorage.getItem(this.tokenKey);
     if(token && token.length > 0){
         return true
     }
     return false;
  }

  setLoggedIn(token){
    localStorage.setItem(this.tokenKey, token);
  }

  removeLoggedIn(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.user);
      localStorage.removeItem(this.cardVal);
  }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }

  setRole(role){
      localStorage.setItem(this.user, role);
  }

  getRole(){
      return localStorage.getItem(this.user);
  }

  isAdmin(){
      let userRole = localStorage.getItem(this.user);
      if(userRole && userRole == 'user'){
          return false
      }else
      return true;
  }

  setCard(data){
      localStorage.setItem(this.cardVal, data.title );
  }

  getCard(){
      return localStorage.getItem(this.cardVal);
  }
  removeCard(){
      localStorage.removeItem(this.cardVal);
  }
}
