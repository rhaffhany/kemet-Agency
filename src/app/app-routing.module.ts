//layouts
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
//components
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',component: AuthLayoutComponent, children:[
      {path:'login', component: LoginComponent, title: 'Login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
