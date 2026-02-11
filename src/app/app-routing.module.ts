import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent ,
  children: [
    {
      path:'',
      redirectTo: 'cows',
      pathMatch: 'full'
    },
    {
      path: 'cows',
      loadChildren: () => import('./features/cows/cows.module').then(m => m.CowsModule)
    }
  ]
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
