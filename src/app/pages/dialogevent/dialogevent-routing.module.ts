import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogeventComponent } from './dialogevent.component';

const routes: Routes = [{ path: '', component: DialogeventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogeventRoutingModule { }
