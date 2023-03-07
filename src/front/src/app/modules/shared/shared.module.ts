import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {
  DxDataGridModule,
  DxDateBoxModule,
  DxDrawerModule,
  DxFormModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxTooltipModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ChangePasswordComponent, LoadingSpinnerComponent, MenuItemComponent],
  imports: [
    CommonModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxLoadPanelModule,
    DxTooltipModule,
    DxDrawerModule,
    DxDataGridModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ChangePasswordComponent,
    DxDateBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxLoadPanelModule,
    DxTooltipModule,
    DxDrawerModule,
    DxDataGridModule,
    HttpClientModule,
    LoadingSpinnerComponent,
    MenuItemComponent
  ]
})
export class SharedModule { }
