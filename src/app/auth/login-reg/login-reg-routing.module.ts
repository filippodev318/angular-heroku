import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegComponent } from './login-reg.component';

const routes: Routes = [{ path: '', component: LoginRegComponent },
{path: 'resetPassword', loadChildren: () => import('../reset-password/reset-password.module').then(m => m.ResetPasswordModule)}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegRoutingModule { }
