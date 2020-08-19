import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';

const routes: Routes = [
  { path: '', component: EventsComponent },
  {path: 'createevent', loadChildren: () => import('../createevent/createevent.module').then(m => m.CreateeventModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
