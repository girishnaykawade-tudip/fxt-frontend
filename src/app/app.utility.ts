import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute }       from '@angular/router';
import { AuthenticationHelper } from 'app.authentication';
import { UserService } from 'app.user-services';


@Injectable()
export class Utility {
    private authentication: AuthenticationHelper;
    private userService: UserService;
    public param1:number;
    public param2:number;
    public param3:number;
    public param4:number;
    public data: any= {};
    public allData: any= {}
    public card: any;
    public rate: any;
    constructor() {
        this.param1 = 0;
        this.param2 = 0;
        this.param3 = 0;
        this.param4 = 0;
        console.log("UTITLIY INSTANCE CREATED");
    }

    public naviagatepostData(cardData):any{
        this.data.param1 = cardData;
        // this.data.param2 = Data.cardRate;
        this.data.param3 = cardData * 0.06;
        this.data.param4 = cardData * 1.06;
    }

    public getData():any{
        return this.data;
    }


    public setallData(value):any{
        this.data.param2 = value;
    }

    public getallData():any{
        return this.allData;
    }

    // global $woocommerce;
    // $porcentaje = 0.06;
    // $surcharge = $price * $porcentaje;
    // $cart_suma = $surcharge + $price;
    // $usd_46 = $dolar * 1.050;
    // $dolar_dividir = $price / $usd_46;



}

