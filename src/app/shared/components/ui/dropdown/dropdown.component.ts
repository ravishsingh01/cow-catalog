import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { DropdownOption } from './dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() optionLabel!: string;
  @Input() optionValue!: string;

  @Input() placeholder = 'Select';
  @Input() showClear = true;
  @Input() disabled = false;

  value: string | number | null = null;
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string | number | null): void {
     this.value = value;
     this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onValueChange(value: string | number | null): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
