import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './pages/cow-list/cow-list.component';

const routes: Routes = [
  {
    path: '',
    component: CowListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowsRoutingModule { }
