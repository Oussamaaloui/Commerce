import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDrawerModule,
  DxFormModule, DxListModule,
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { RouterModule } from '@angular/router';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { UnauthorizedInterceptor } from 'src/app/helpers/unauthorized.interceptor';


@NgModule({
  declarations: [ChangePasswordComponent, LoadingSpinnerComponent, MenuItemComponent, ChangeInfoComponent, ChangeEmailComponent],
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
    DxCheckBoxModule,
    DxListModule,
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
    MenuItemComponent,
    ChangeEmailComponent,
    DxCheckBoxModule,
    DxListModule,
    ChangeInfoComponent
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ]
})
export class SharedModule { }
