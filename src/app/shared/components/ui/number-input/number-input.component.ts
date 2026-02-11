import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {

  @Input() placeholder: string = '';
  @Input() min?: number;
  @Input() max?: number;
  @Input() useGrouping: boolean = false;
  @Input() allowDecimal: boolean = false;
  @Input() maxDecimalPlaces: number = 2;

  value: number | null = null;
  disabled: boolean = false;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handlePrimeInput(event: InputNumberInputEvent): void {
    const numericValue: number | null =
      typeof event.value === 'number' ? event.value : null;

    this.value = numericValue;
    this.onChange(numericValue);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
