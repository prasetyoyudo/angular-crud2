import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';
import { LayoutComponent }                  from '../layout/layout.component';
import { AddUsersComponent } from './add-user/add-user.component';
import { UsersComponent }                   from './users/users.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'users/add-user', component: AddUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }