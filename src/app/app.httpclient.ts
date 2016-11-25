import { Injectable , Inject} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AuthenticationHelper } from "./app.authentication";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class HttpClientHelper {
//  baseUrl:String  = 'http://api.fxt.tudip.com/api/v1/';  // URL to web API
    baseUrl:String  = 'http://localhost:8000/api/v1/';  // URL to web API
    constructor(http: Http, private authentication: AuthenticationHelper, private router: Router) {
    this.http = http;
  }

  createAuthorizationHeader(): Headers {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'auth_token ' + this.authentication.getToken());
     return headers;
  }

  get(url) : Observable<any> {
   // url = this.baseUrl + url;
   // let headers = this.createAuthorizationHeader();
    return this.http.get(url)
           .map(this.extractResponse)
           .catch(this.handleError);
  }

postPreLogin(url, data) : Observable<any> {
    let body = JSON.stringify(data);
    let headers = this.createAuthorizationHeader();
    url = this.baseUrl + url;
    return this.http.post(url, body, { headers: headers })
           .map(this.extractResponse)
           .catch(this.handleErrorPreLogin);
  }

  post(url, data) : Observable<any> {
    let body = JSON.stringify(data);
    let headers = this.createAuthorizationHeader();
    url = this.baseUrl + url;
    return this.http.post(url, body, { headers: headers })
           .map(this.extractResponse)
           .catch(this.handleError);
  }

postByHeader(url, data, header) : Observable<any> {
    let body = JSON.stringify(data);
    url = this.baseUrl + url;
    return this.http.post(url, body, { headers: header })
           .map(this.extractResponse)
           .catch(this.handleError);
  }

postByHeaderPreLogin(url, data, header) : Observable<any> {
    let body = JSON.stringify(data);
    url = this.baseUrl + url;
    return this.http.post(url, body, { headers: header })
           .map(this.extractResponse)
           .catch(this.handleErrorPreLogin);
  }

  private extractResponse(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response): Observable<any> {
    let result = error.json();
    if(!result || !result.error_message){
      result.error_message = 'Unexpected Error Occured at server';
    }
    else{
      if(result.error_code == '102' || result.error_code == '103' ){
        this.authentication.removeLoggedIn();
         this.router.navigate(['pages']);
      }
    }
    return Observable.throw(result ||  'Server error');
  }

  private handleErrorPreLogin(error: Response): Observable<any>{
    let result = error.json();
    if(!result || !result.error_message){
      result.error_message = 'Incorrect Username or Password';
    }
    return Observable.throw(result ||  'Server error');
  }

}
