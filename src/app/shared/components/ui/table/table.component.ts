import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TableRowSelectEvent } from 'primeng/table';

export interface TableColumn {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T = unknown> {


  @Input() value: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() dataKey?: string;


  @Input() loading = false;
  @Input() paginator = true;
  @Input() rows = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];

  @Output() rowClick = new EventEmitter<T>();

  onRowSelect(event: TableRowSelectEvent): void {
    const row = event?.data as T | undefined;

    if (!row) {
      return; 
    }

    this.rowClick.emit(row);
  }
}
