import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { Cow } from '../../models/cow.model';
import { CowFilters } from '../../models/cow-filters.model';
import { CowService } from '../../services/cow.service';

@Component({
  selector: 'app-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent implements OnInit, OnDestroy {

  cows$!: Observable<Cow[]>;
  private destroy$ = new Subject<void>();

  filters: CowFilters = {
    search: null,
    status: null,
    pen: null
  };

  page = 0;
  rows = 10;
  totalRecords = 0;
  loading = false;

  columns = [
    { field: 'id', header: 'Ear Tag' },
    { field: 'sex', header: 'Sex' },
    { field: 'pen', header: 'Pen' },
    { field: 'status', header: 'Status' },
    { field: 'lastEventDate', header: 'Last Event' }
  ];

  constructor(
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cows$ = this.route.queryParamMap.pipe(
      debounceTime(150),

      map(params => {
        const page = +(params.get('page') ?? 0);
        const rows = +(params.get('rows') ?? 10);

        const filters: CowFilters = {
          search: this.normalize(params.get('search')),
          status: this.normalize(params.get('status')) as Cow['status'] | null,
          pen: this.normalize(params.get('pen'))
        };


        this.page = page;
        this.rows = rows;
        this.filters = filters;

        return { page, rows, filters };
      }),

      distinctUntilChanged((a, b) =>
        a.page === b.page &&
        a.rows === b.rows &&
        a.filters.search === b.filters.search &&
        a.filters.status === b.filters.status &&
        a.filters.pen === b.filters.pen
      ),

      switchMap(state => {
        this.loading = true;

        return this.cowService
          .getPagedCows(state.page, state.rows, state.filters)
          .pipe(
            tap({
              next: result => {
                this.totalRecords = result.total;
                this.loading = false;
              },
              error: err => {
                console.error('Failed to load cows', err);
                this.totalRecords = 0;
                this.loading = false;
              }
            }),
            catchError(() => of({ data: [], total: 0 }))
          );
      }),

      map(result => result.data),

      takeUntil(this.destroy$)
    );
  }



  onSearch(value: string): void {
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {
      search: value || null,
      page: null
    },
    queryParamsHandling: 'merge'
  });
}

  onStatusChange(status: Cow['status'] | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status: status || null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }


  onPenChange(pen: string | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pen: pen || null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }


  onPageChange(event: { page: number; rows: number }): void {
    const isRowsChanged = event.rows !== this.rows;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: isRowsChanged ? null : (event.page > 0 ? event.page : null),
        rows: event.rows !== 10 ? event.rows : null
      },
      queryParamsHandling: 'merge'
    });
  }

  onAddCow(): void {
    this.router.navigate(['/cows/new']);
  }

  rowClick(cow: Cow): void {
    this.router.navigate(['/cows', cow.id]);
  }

  private normalize(value: string | null): string | null {
    return value && value.trim().length ? value : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
