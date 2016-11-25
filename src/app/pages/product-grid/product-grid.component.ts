import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import { Utility } from "../../app.utility.ts";
import {NG2_SMART_TABLE_DIRECTIVES, LocalDataSource} from 'ng2-smart-table';
import {SmartTablesService} from "../tables/components/smartTables/smartTables.service";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'product-grid',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./product-grid.scss')],
  template: require('./product-grid.html'),
  providers: [UserService, SmartTablesService ]
})

export class ProductGrid {

  source: LocalDataSource = new LocalDataSource();
  Data = [];
  jQuery:any;
  settings = {
    hideSubHeader : true,
    mode: 'external',
    action:{
      delete : false,
      edit:true

    },
    edit: {
      editButton: false,
      editButtonContent: '<a class="btn">Edit</a>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    /*delete: {
      deleteButton: false,
      deleteButtonContent: '<a class="btn">Add Details</a>',
      confirmDelete: true
    },*/
    columns: {
      product_name: {
        title: 'Name',
        filter: false,
        editable: false
      },
        product_description: {
        title: 'Description',
        filter: false,
        editable: false
      },
        product_price: {
        title: 'Price',
        filter: false,
        editable: false
      },
      SKU: {
        title: 'SKU',
        filter: false,
        editable: false
      },
      category_name: {
        title: 'Category Name',
        filter: false,
        editable: false

      },
     category_isActive: {
        title: 'Status',
        filter: false,
        editable: false
      }
    }
  };

  constructor( private userService: UserService,public utility: Utility, private router: Router, private routes: ActivatedRoute, private authentication: AuthenticationHelper, protected service: SmartTablesService) {
      this.getProduct('all');


    /*  if(this.authentication.isLoggedIn()){
        if(!this.authentication.isAdmin()) {
          this.router.navigate(['pages']);
        }else{
          this.router.navigate(['pages/product-grid']);
        }
      }*/
    }

  public getProduct(data):any{
      this.userService.getProduct(data).subscribe(
          data => this.paySucces(data),
          error =>  this.payFail(error)

      );

  }


  public paySucces(result) {
    for (let i = 0; i <= result.data.count; i++) {
      if (result.data.data[i] != null) {
        this.Data.push(result.data.data[i]);
      }
    }
   //console.log(result.data);
    this.source.load(this.Data);
  }

  public saveData(Event):any{
    this.userService.saveCard(Event.Data).subscribe(
        data => this.paySucces(data),
        error =>  this.payFail(error)
    );
  }

  public clicked(Event):any{
    this.router.navigate(['/pages/add-product'],{queryParams : {id : Event.data.id }});
  }

  public more(Event):any{
    // this.router.navigate(['/pages/add-details'],{queryParams : {id : Event.data.id }});
  }


  public payFail(error){
    toastr.error(error.data.message);
    this.submitted = false;
    this.invalidInput = true;
    this.registerError = error.data.message;
  }

  ngOnInit():any{
  }

  onSearch(query: string = ''): void {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'product_name',
        search: query
      },
      {
        field: 'SKU',
        search: query
      },

    ], false);
  }


  onDeleteConfirm(event):void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  public visible = false;
  private visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}
