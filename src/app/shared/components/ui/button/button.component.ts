import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() label = '';
  @Input() icon?: string;

  @Input() severity: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'primary';
  @Input() outlined = false;
  @Input() text = false;

  @Input() disabled = false;
  @Input() loading = false;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (this.disabled || this.loading) {
      return;
    }
    this.clicked.emit();
  }
}
