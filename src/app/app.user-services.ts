import { Injectable , Inject} from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { HttpClientHelper } from './app.httpclient';
  import 'rxjs/Rx';
// import localStorage from 'localStorage';

@Injectable()
export class UserService {
  public httpClient :any;
  private loginUrl:string = 'login';
  private registerUrl:string = 'signUp';
  private addCategoryUrl:string = 'addCategory';
  private addProductUrl:string = 'addProduct';
  private enquiryUrl:string = 'enquiry';
  private logoutUrl:string = 'logout';
  private userForgotUrl:string = 'forgotPassword';
  private userResetPassUrl:string = 'changePassword';
  private usersetPasswordUrl:string = 'setPassword';
  private facebookLoginUrl:string = 'auth/facebook/token?access_token=';
  private checkCompanyUrl ='checkCompany';
  private saveUserInCompanyUrl ='companyExists';
  private uploadSubcontractorFileUrl ='uploadSubcontractors';
  private getConstructionSectorUrl = 'getConstructionSector';
  private getSubConstructionSectorUrl = 'getSubConstructionSector';
  private companySignUpUrl = 'signUpCompany';
  private uploadFileUrl = 'uploadSubcontractors';
  private getStateUrl = 'getState';
  private sendInviteEmailUrl = 'sendInvitationMailToSubcontractors';
  private getCurrencyRate = 'http://apilayer.net/api/live?access_key=529c2e40084f9edcfdc2ee3475a7facc&currencies=CLP&source=USD&format=1';
  private saveCardInfo = 'payCard';
  private saveOrderInfo = 'saveOrder';
  private getAllData = 'getUsersData';
  private getCardData = 'getCardData';
  private getuser = 'getUserByToken';
  private getCategoryUrl = 'getAllCategories';
  private getProductUrl = 'getAllProduct';

  constructor (httpClient: HttpClientHelper) {
        this.httpClient = httpClient;
      }

  private extractResponse(res: JSON) {
    return res;
  }

  private handleError (error: any) {
    return Observable.throw(error);
  }

  //For signup service
  userSignup (data): Observable<any> {
    return this.httpClient.postPreLogin(this.registerUrl, data)
                    .map(this.extractResponse)
                    .catch(this.handleError);
  }
	userLogin (data): Observable<any> {
     	return this.httpClient.postPreLogin(this.loginUrl, data)
                    .map(this.extractResponse)
                    .catch(this.handleError);
  }

  //For signup service
  userLogout (data): Observable<any> {
    data = {
      "authToken": data
    };

    console.log('logout data', data);
       	return this.httpClient.post(this.logoutUrl, data)
                    .map(this.extractResponse)
                    .catch(this.handleError);
  }

   //Send Forgot Password Link
   userForgot (data): Observable<any> {
    return this.httpClient.postPreLogin(this.userForgotUrl, data)
                    .map(this.extractResponse)
                    .catch(this.handleError);
  }

 //Send Reset password with new password
  userReset (data): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.postByHeaderPreLogin(this.userResetPassUrl, data, headers)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

    setPassword (data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpClient.postByHeaderPreLogin(this.usersetPasswordUrl, data, headers)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    facebookLogin (data): Observable<any>{
     this.facebookLoginUrl = this.facebookLoginUrl+ data.token;
    return this.httpClient.get(this.facebookLoginUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

//Post Idea
//   userIdea (data): Observable<any>{
//     return this.httpClient.post(this.userIdeaurl, data)
//       .map(this.extractResponse)
//       .catch(this.handleError);
//   }

  checkCompanyName (data): Observable<any>{
    return this.httpClient.post(this.checkCompanyUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  saveUserInCompany (data): Observable<any>{
    return this.httpClient.post(this.saveUserInCompanyUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  uploadSubcontractorFile (data): Observable<any>{
    return this.httpClient.post(this.uploadSubcontractorFileUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  getConstructionSector (data): Observable<any>{
    return this.httpClient.get(this.getConstructionSectorUrl)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  getProjectTypesOnBasedOfSector (data): Observable<any>{
    return this.httpClient.post(this.getSubConstructionSectorUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  companySignUp (data): Observable<any>{
    console.log(data);
    return this.httpClient.post(this.companySignUpUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  getStateListOnKeyUp (data): Observable<any>{
    return this.httpClient.post(this.getStateUrl, data)
      .map(this.extractResonse)
      .catch(this.handleError);
  }

  sendInviteToSubcontractors (data): Observable<any>{
    return this.httpClient.post(this.sendInviteEmailUrl, data)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  getCurrentCUrrencyRate (): Observable<any>{
    return this.httpClient.get(this.getCurrencyRate)
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  enquirySave (data): Observable<any> {
    return this.httpClient.postPreLogin(this.enquiryUrl, data)
        .map(this.extractResponse)
        .catch(this.handleError);
  }

  saveCard (data): Observable<any> {
    return this.httpClient.postPreLogin(this.saveCardInfo, data)
        .map(this.extractResponse)
        .catch(this.handleError);
  }

  saveOrder (data): Observable<any> {
    return this.httpClient.postPreLogin(this.saveOrderInfo, data)
        .map(this.extractResponse)
        .catch(this.handleError);
  }

  getUsers(data): Observable<any> {
    return this.httpClient.post(this.getAllData, data )
        .map(this.extractResponse)
        .catch(this.handleError);
  }

    getCategory(data): Observable<any> {
    return this.httpClient.post(this.getCategoryUrl, data )
        .map(this.extractResponse)
        .catch(this.handleError);
  }

    addCategory (data): Observable<any> {
        return this.httpClient.post(this.addCategoryUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    addProduct (data): Observable<any> {
        return this.httpClient.post(this.addProductUrl, data)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    getProduct(data): Observable<any> {
        return this.httpClient.post(this.getProductUrl, data )
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    getCards(data): Observable<any> {
    return this.httpClient.post(this.getCardData, data )
        .map(this.extractResponse)
        .catch(this.handleError);
  }

  getUserbytoken(data): Observable<any> {
    return this.httpClient.post(this.getuser, data )
        .map(this.extractResponse)
        .catch(this.handleError);
  }

}
