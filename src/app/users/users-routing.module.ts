import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacationEditComponent } from './vacation-edit/vacation-edit.component';

const routes: Routes = [
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class UsersRoutingModule{}