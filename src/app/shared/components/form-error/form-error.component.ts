import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {

  @Input() control!: AbstractControl | null;

  get message(): string | null {
    if (!this.control || (!this.control.touched && !this.control.dirty) || !this.control.errors) {
      return null;
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['min']) {
      return 'Value must be greater than zero';
    }

    if (errors['maxlength']) {
      return `Maximum length is ${errors['maxlength'].requiredLength}`;
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    return 'Invalid value';
  }
}

