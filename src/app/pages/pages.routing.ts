import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
    {
        path: 'forgot',
        loadChildren: function () { return System.import('./forgot/forgot.module.ts'); }
    },
  {
        path: 'passwordreset',
        loadChildren: function () { return System.import('./passwordreset/passwordreset.module.ts'); }
  },
  {
    path: 'welcome',
    loadChildren: function () { return System.import('./welcome/welcome.module.ts'); }
  },
  {
    path: 'setPassword',
    loadChildren: function () { return System.import('./setPassword/setPassword.module'); }
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'cards', loadChildren: () => System.import('./cards/cards.module') },
      { path: 'add-to-cart', loadChildren: () => System.import('./add-to-cart/add-to-cart.module') },
      { path: 'user-grid', loadChildren: () => System.import('./user-grid/user-grid.module') },
      { path: 'category-grid', loadChildren: () => System.import('./category-grid/category-grid.module') },
      { path: 'product-grid', loadChildren: () => System.import('./product-grid/product-grid.module') },

      { path: 'add-user', loadChildren: () => System.import('./add-user/add-user.module') },
      { path: 'add-category', loadChildren: () => System.import('./add-category/add-category.module') },
      { path: 'add-product', loadChildren: () => System.import('./add-product/add-product.module') },
      { path: 'order-receipt', loadChildren: () => System.import('./order-receipt/order-receipt.module') },
      { path: 'balance-details', loadChildren: () => System.import('./balance-details/balance-details.module') },
      { path: 'user-details', loadChildren: () => System.import('./user-details/user-details.module') },
      { path: 'card-details', loadChildren: () => System.import('./card-details/card-details.module') },
      // { path: '', redirectTo: 'inviteSubcontractors', pathMatch: 'full' },
      { path: 'inviteSubcontractors', loadChildren: () => System.import('./invite-subcontractors/invite-subcontractors.module') },
      // { path: '', redirectTo: 'companyRegister', pathMatch: 'full' },
      { path: 'companyRegister', loadChildren: () => System.import('./company-register-form/company-register-form.module') },
      // { path: '', redirectTo: 'showCompanyAddress', pathMatch: 'full' },
      { path: 'showCompanyAddress', loadChildren: () => System.import('./check-company-address/check-company-address.module') },
      // { path: '', redirectTo: 'register2', pathMatch: 'full' },
      { path: 'register2', loadChildren: () => System.import('./register-2-Address/register-2-address.module') },
      { path: 'add-user', loadChildren: () => System.import('./add-user/add-user.module') },
      { path: 'idea', loadChildren: () => System.import('./idea/idea.module') },
      { path: 'components', loadChildren: () => System.import('./components/components.module') },
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
      { path: 'maps', loadChildren: () => System.import('./maps/maps.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
