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
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { IconComponent } from './components/ui/icon/icon.component';
import { HumanizePipe } from './pipes/humanize.pipe';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    NotFoundComponent,
    DropdownComponent,
    ButtonComponent,
    TextInputComponent,
    NumberInputComponent,
    TableComponent,
    FormFieldComponent,
    FormErrorComponent,
    PageHeaderComponent,
    IconComponent,
    HumanizePipe,
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TooltipModule,
  ],
  exports: [
    NotFoundComponent,
    DropdownComponent,
    ButtonComponent,
    TextInputComponent,
    NumberInputComponent,
    TableComponent,
    FormFieldComponent,
    FormErrorComponent,
    PageHeaderComponent,
    IconComponent,
    HumanizePipe,
    SearchInputComponent,
  ],
})
export class SharedModule {}
