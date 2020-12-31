import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserListResolverService } from './admin/user-list-resolver.service';
import { AdminCalendarComponent } from './admin/user-list/admin-calendar/admin-calendar.component';
import { VacationDetailComponent } from './admin/user-list/admin-calendar/vacation-detail/vacation-detail.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersComponent } from './users/users.component';
import { VacationEditComponent } from './users/vacation-edit/vacation-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'calendar', component: UsersComponent, children:[
    {path: 'new', component: VacationEditComponent, canActivate:[AuthGuard]},
    {path: ':id', component: VacationEditComponent, canActivate:[AuthGuard]}
]},
  { path: 'admin', component: AdminComponent, children:[
    {path: ':id', component: AdminCalendarComponent, resolve:[UserListResolverService], canActivate:[AuthGuard], children:[
      {path: ':index', component: VacationDetailComponent, resolve:[UserListResolverService], canActivate:[AuthGuard]}
    ]},     
]},
  { path: 'login', component: AuthComponent, children:[
    {path: '', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgot', component: ForgotPasswordComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
