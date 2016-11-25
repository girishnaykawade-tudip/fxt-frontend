import {Component, ViewEncapsulation, ViewChild, Input} from '@angular/core';
import { UserService } from "../../app.user-services";
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationHelper } from "../../app.authentication";
import { Utility } from "../../app.utility.ts";
import {NG2_SMART_TABLE_DIRECTIVES, LocalDataSource } from 'ng2-smart-table';
import {SmartTablesService} from "../tables/components/smartTables/smartTables.service";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'user-details',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./user-details.scss')],
  template: require('./user-details.html'),
  providers: [UserService, SmartTablesService ]
})

export class UserDetails {

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
      editButtonContent: '<a class="btn">Activate</a>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButton: false,
      deleteButtonContent: '<a class="btn">Add Details</a>',
      confirmDelete: true
    },
    columns: {
      first_name: {
        title: 'Customer Name',
        filter: false,
        editable: false
      },
      rut: {
        title: 'RUT',
        filter: false,
        editable: false
      },
      user_id: {
        title: 'User Id',
        filter: false,
        editable: false
      },
      proxy_number: {
        title: 'Proxy Number',
        filter: false,
        editable: false
      },
      card_type: {
        title: 'Card Type',
        filter: false,
        editable: false
      }
    }
  };

  //   {
  //     created_at: "2016-09-22 08:09:51",
  //     email: "sdfs@d.dc",
  //     name: "dsa",
  //     id: 1,
  //     is_active: 1,
  //     last_login_at: "2016-09-26 14:09:29",
  //     last_name: null,
  //     password: "$2y$10$IV6mLlAUwoPSlIirswos5ec0MAFtCKY7LjcTvyrnNMCP/V/ge0B..",
  //     remember_token: "dsa",
  //     role: "user",
  //     updated_at: "2016-09-28 10:16:10"
  //   }
  // ];

    constructor( private userService: UserService,public utility: Utility, private router: Router, private routes: ActivatedRoute, private authentication: AuthenticationHelper, protected service: SmartTablesService) {
      this.getData();
      if(this.authentication.isLoggedIn()){
        // if(!this.authentication.isAdmin()) {
        //   this.router.navigate(['pages']);
        // }else{
        //   this.router.navigate(['pages/user-grid']);
        // }
      }
    }

  public getData():any{
      this.userService.getCards().subscribe(
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
    this.source.load(this.Data);
  }

  public saveData(Event):any{
    this.userService.saveCard(Event.Data).subscribe(
        data => this.paySucces(data),
        error =>  this.payFail(error)
    );
  }

  public clicked(Event):any{
    // this.router.navigate(['/pages/add-user'],{queryParams : {id : Event.data.id }});
    this.router.navigate(['/pages/card-details']);
  }

  public render():any{
    this.router.navigate(['/pages/card-details']);
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
        field: 'rut',
        search: query
      },
      {
        field: 'first_name',
        search: query
      },
      {
        field: 'user_id',
        search: query
      },
      {
        field: 'proxy_number',
        search: query
      }
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
