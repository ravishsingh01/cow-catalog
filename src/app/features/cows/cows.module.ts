import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowsRoutingModule } from './cows-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CowListComponent } from './pages/cow-list/cow-list.component';
import { CowService } from './services/cow.service';


@NgModule({
  declarations: [
    CowListComponent,
  ],
  imports: [
    CommonModule,
    CowsRoutingModule,
    SharedModule
  ],
  providers: [CowService]
})
export class CowsModule { }
