import {
  Component,
  Input,
  Optional,
  Host,
  SkipSelf
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input() label = '';

  @Input() controlName!: string;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  /** Resolve control from parent FormGroup/FormGroupName */
  get control(): AbstractControl | null {
    if (!this.controlContainer || !this.controlName) {
      return null;
    }
    
    const ctrl = this.controlContainer.control?.get(this.controlName) ?? null;
    return ctrl;
  }
}
