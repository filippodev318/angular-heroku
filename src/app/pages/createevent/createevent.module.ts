import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateeventRoutingModule } from './createevent-routing.module';
import { CreateeventComponent } from './createevent.component';
import { MaterialModule } from '../../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [CreateeventComponent],
  imports: [
    CommonModule,
    CreateeventRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBK6BtCSyxSSU_gwx5nYwgfy-nXmeS38Kc'
    })
  ]
})
export class CreateeventModule { }
