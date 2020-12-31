import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCalendarComponent } from './users/user-calendar/user-calendar.component';
import { VacationEditComponent } from './users/vacation-edit/vacation-edit.component';
import { UsersRoutingModule } from './users/users-routing.module';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { VacationDetailComponent } from './admin/user-list/admin-calendar/vacation-detail/vacation-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminCalendarComponent } from './admin/user-list/admin-calendar/admin-calendar.component';
import { ReversePipe } from './shared/pipes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UsersComponent,
    UserDetailComponent,
    UserCalendarComponent,
    VacationEditComponent,
    AdminComponent,
    UserListComponent,
    VacationDetailComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AdminCalendarComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    FormsModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [UserCalendarComponent]
})
export class AppModule { }
