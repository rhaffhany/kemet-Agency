import { QuestionsComponent } from './components/questions/questions.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
//layouts
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
//components
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PackagesComponent } from './components/packages/packages.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IncomeComponent } from './components/income/income.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { UpdatePackageComponent } from './components/update-package/update-package.component';

const routes: Routes = [
  {
    path:'',component: AuthLayoutComponent, children:[
      {path:'login', component: LoginComponent, title: 'Login'}
    ]
  },
  {
    path:'', component: DashboardLayoutComponent, children:[
      {path:'dashboard', component: DashboardComponent, title:'Dashboard'},
      {path:'profile', component: ProfileComponent, title:'Profile'},
      {path:'edit-profile', component: EditProfileComponent, title:'Edit Profile'},
      {path:'packages', component: PackagesComponent, title:'Packages'},
      {path:'add-package', component: AddPackageComponent, title:'Add Package'},
      {path:'update-package/:planID', component: UpdatePackageComponent, title:'Update Package'},
      {path:'customers', component: CustomersComponent, title:'Customers'},
      {path:'reviews', component: ReviewsComponent, title:'Reviews'},
      {path:'income', component: IncomeComponent, title:'Income'},
      {path:'questions', component: QuestionsComponent, title:'Questions'},
    ]
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found 404!' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'top'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
