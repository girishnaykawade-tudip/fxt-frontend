"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var nga_module_ts_1 = require('../../theme/nga.module.ts');
var forgot_component_ts_1 = require('../forgot/forgot.component.ts');
var forgot_routing_ts_1 = require('../forgot/forgot.routing.ts');
var platform_browser_1 = require('@angular/platform-browser');
var ForgotModule = (function () {
    function ForgotModule() {
    }
    ForgotModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                nga_module_ts_1.NgaModule,
                platform_browser_1.BrowserModule,
                forgot_routing_ts_1.routing
            ],
            declarations: [
                forgot_component_ts_1.Forgot
            ]
        })
    ], ForgotModule);
    return ForgotModule;
}());
exports.__esModule = true;
exports["default"] = ForgotModule;
//# sourceMappingURL=forgot.module.js.map