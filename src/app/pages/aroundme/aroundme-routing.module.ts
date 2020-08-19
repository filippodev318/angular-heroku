import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AroundmeComponent } from './aroundme.component';

const routes: Routes = [{ path: '', component: AroundmeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AroundmeRoutingModule { }
