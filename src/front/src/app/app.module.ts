import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListRdvComponent } from './components/list-rdv/list-rdv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { CalendarModule, DateAdapter,  } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRdvComponent } from './components/edit-rdv/edit-rdv.component'; 
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DarkThemeToggleComponent } from './shared/dark-mode-toggler/dark-mode-toggler.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxDateBoxModule, DxPopupModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { UnauthorizedInterceptor } from './helpers/unauthorized.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListRdvComponent,
    LogoutComponent,
    EditRdvComponent,
    NavBarComponent,
    DarkThemeToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule, 
    DxSelectBoxModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
