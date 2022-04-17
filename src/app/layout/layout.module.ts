import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './_pipe/pipe.module';
import { AddUsersComponent } from './add-user/add-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    LayoutComponent,
    UsersComponent,
    AddUsersComponent,
    DatePickerComponent
  ],
  imports: [
    LayoutRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipeModule,
    MatDatepickerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    // LayoutService,
  ],
})
export class LayoutModule { }
