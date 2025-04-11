import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePipe } from './pipe/change.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputNumberModule } from 'primeng/inputnumber';


import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PackagesComponent } from './components/packages/packages.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IncomeComponent } from './components/income/income.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    ChangePipe,
    LoginComponent,
    AuthLayoutComponent,
    ProfileComponent,
    DashboardComponent,
    PackagesComponent,
    CustomersComponent,
    ReviewsComponent,
    QuestionsComponent,
    SidebarComponent,
    DashboardLayoutComponent,
    NotFoundComponent,
    IncomeComponent,
    EditProfileComponent,
    AddPackageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartModule,
    PaginatorModule,
    FormsModule,
    CommonModule,
    SpeedDialModule,
    InputNumberModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppModule { }
