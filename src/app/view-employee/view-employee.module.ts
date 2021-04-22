import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewEmployeePageRoutingModule } from './view-employee-routing.module';
import { ViewEmployeePage } from './view-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewEmployeePageRoutingModule
  ],
  declarations: [ViewEmployeePage]
})
export class ViewEmployeePageModule {}
