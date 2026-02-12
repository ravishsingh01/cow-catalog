import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { TablePageEvent } from 'primeng/table';

interface PaginationEvent {
  first?: number;
  page?: number;
  rows?: number;
  pageCount?: number;
}

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
  @Input() rowClickable = false;

  @Input() loading = false;
  @Input() paginator = true;
  @Input() rows = 10;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20, 50];
  @Input() totalRecords = 0;
  @Input() lazy = false;
  @Output() rowClick = new EventEmitter<T>();

  @Output() pageChange = new EventEmitter<{
    page: number;
    rows: number;
  }>();

  onRowClick(row: T): void {
    if (!this.rowClickable) return;
    this.rowClick.emit(row);
  }

  onPageChange(event: TablePageEvent): void {
    const paginationEvent = event as unknown as PaginationEvent;
    const pageNumber = paginationEvent.page !== undefined 
      ? paginationEvent.page 
      : paginationEvent.first !== undefined 
        ? Math.floor(paginationEvent.first / (paginationEvent.rows || this.rows))
        : 0;
        
    this.pageChange.emit({
      page: pageNumber,
      rows: paginationEvent.rows ?? this.rows
    });
  }
}
