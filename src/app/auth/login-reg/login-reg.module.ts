import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegRoutingModule } from './login-reg-routing.module';
import { LoginRegComponent } from './login-reg.component';
import { MaterialModule } from '../../material/material.module'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [LoginRegComponent],
  imports: [
    CommonModule,
    LoginRegRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class LoginRegModule { }
