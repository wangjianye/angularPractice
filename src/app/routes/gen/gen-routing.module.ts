import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenIndexComponent } from './index/index.component';

const routes: Routes = [

  { path: 'index', component: GenIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenRoutingModule { }
