import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextInputComponent } from './components/ui/text-input/text-input.component';
import { NumberInputComponent } from './components/ui/number-input/number-input.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from './components/ui/table/table.component';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    NotFoundComponent,
    DropdownComponent,
    ButtonComponent,
    TextInputComponent,
    NumberInputComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    TableModule
  ],
  exports: [
    NotFoundComponent, 
    DropdownComponent, 
    ButtonComponent,
    TextInputComponent,
    NumberInputComponent,
    TableComponent
  ]
})
export class SharedModule { }
