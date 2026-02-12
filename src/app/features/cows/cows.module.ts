import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowsRoutingModule } from './cows-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CowListComponent } from './pages/cow-list/cow-list.component';
import { CreateCowComponent } from './pages/create-cow/create-cow.component';
import { CowService } from './services/cow.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CowListComponent,
    CreateCowComponent,
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
