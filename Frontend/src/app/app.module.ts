import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { SweetListComponent } from './sweets/sweet-list.component';
import { SweetFormComponent } from './sweets/sweet-form.component';

import { AuthService } from './services/auth.service';
import { SweetService } from './services/sweet.service';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SweetListComponent,
    SweetFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SweetListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin/add', component: SweetFormComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'admin/edit/:id', component: SweetFormComponent, canActivate: [AuthGuard, AdminGuard] }
    ])
  ],
  providers: [
    AuthService,
    SweetService,
    AuthGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
