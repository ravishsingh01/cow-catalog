import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() clickable = false;
  @Output() iconClick = new EventEmitter<void>();
}
