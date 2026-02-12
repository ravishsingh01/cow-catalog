import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './pages/cow-list/cow-list.component';
import { CreateCowComponent } from './pages/create-cow/create-cow.component';

const routes: Routes = [
  {
    path: '',
    component: CowListComponent
  }
  ,
  {
    path: 'create-cow',
    component: CreateCowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowsRoutingModule { }
