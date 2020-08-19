import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AroundmeRoutingModule } from './aroundme-routing.module';
import { AroundmeComponent } from './aroundme.component';

import { AgmCoreModule } from '@agm/core';

import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [AroundmeComponent],
  imports: [
    CommonModule,
    AroundmeRoutingModule,
    HttpClientModule,
    AgmCoreModule
  ]
})
export class AroundmeModule { }
