import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {
  DxDateBoxModule,
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


@NgModule({
  declarations: [ChangePasswordComponent, LoadingSpinnerComponent],
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
    DxTooltipModule
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
    DxTooltipModule
  ]
})
export class SharedModule { }
