import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowsRoutingModule } from './cows-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CowListComponent } from './pages/cow-list/cow-list.component';
import { CreateCowComponent } from './pages/create-cow/create-cow.component';
import { CowService } from './services/cow.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CowDetailComponent } from './pages/cow-detail/cow-detail.component';


@NgModule({
  declarations: [
    CowListComponent,
    CreateCowComponent,
    CowDetailComponent,
  ],
  imports: [
    CommonModule,
    CowsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [CowService]
})
export class CowsModule { }
