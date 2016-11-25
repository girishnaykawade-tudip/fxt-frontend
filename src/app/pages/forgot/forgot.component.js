"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var EmailValidator = require('../../theme/validators/email.validator');
var app_user_services_1 = require("../../app.user-services");
var Forgot = (function () {
    function Forgot(fb, userService) {
        this.userService = userService;
        this.submitted = false;
        this.form = fb.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), EmailValidator.validate])]
        });
        this.email = this.form.controls['email'];
    }
    Forgot.prototype.onSubmit = function (values) {
        var _this = this;
        //this.toastr.success('You are awesome!', 'Success!');
        this.submitted = true;
        this.data = {
            email: values.email
        };

      if (this.form.valid) {
        this.userService.userForgot(this.data).subscribe(function (data) {
          return _this.userData = JSON.stringify(data);
        }, function (error) {
          return console.log("ERROR");
        });
        // this.router.navigate(['pages']);
      }
    };
    Forgot.prototype.onFacebookLoginClick = function () {
        var _this = this;
        FB.login(function (response) {
            _this.statusChangeCallback(response);
        });
    };
    Forgot.prototype.statusChangeCallback = function (resp) {
        console.log(resp);
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log("auth");
        }
        else if (resp.status === 'not_authorized') {
            console.log("not auth");
        }
        else {
            console.log("canceled by user");
        }
    };
    Forgot = __decorate([
        core_1.Component({
            selector: ['forgot'],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [],
            styles: [require('./../login/login.scss')],
            template: require('./forgot.html'),
            providers: [app_user_services_1.UserService]
        })
    ], Forgot);
    return Forgot;
}());
exports.Forgot = Forgot;
//# sourceMappingURL=forgot.component.js.map
