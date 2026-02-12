import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './pages/cow-list/cow-list.component';
import { CreateCowComponent } from './pages/create-cow/create-cow.component';
import { CowDetailComponent } from './pages/cow-detail/cow-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CowListComponent
  }
  ,
  {
    path: 'create',
    component: CreateCowComponent
  },
  {
    path: ':id',
    component:CowDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowsRoutingModule { }
