import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, shareReplay, switchMap, takeUntil, tap } from 'rxjs';
import { CowPen, CowStatus } from '../../models/cow.model';
import { CowFilters } from '../../models/cow-filters.model';
import { CowService } from '../../services/cow.service';
import {
  COW_STATUS_OPTIONS,
  COW_PEN_OPTIONS
} from 'src/app/core/constants/cow.constants';
import { humanize } from 'src/app/shared/utils/string-format.util';
import { CowRowVM } from '../../models/cow-row.vm';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss'],
})
export class CowListComponent implements OnInit, OnDestroy {
  cows$!: Observable<CowRowVM[]>;
  private destroy$ = new Subject<void>();
  state$ = this.route.queryParamMap.pipe(
    map((params) => this.deriveStateFromParams(params)),
    distinctUntilChanged((a, b) => this.stateKey(a) === this.stateKey(b)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  search$ = this.state$.pipe(
    map((state) => state.filters.search ?? ''),
    debounceTime(300),
    distinctUntilChanged(),
  );

  status$ = this.state$.pipe(map((state) => state.filters.status ?? null));

  pen$ = this.state$.pipe(map((state) => state.filters.pen ?? null));
  page = 0;
  rows = 10;
  totalRecords = 0;
  loading = false;
  statusOptions = COW_STATUS_OPTIONS;
  penOptions = COW_PEN_OPTIONS;
  columns = [
    { field: 'id', header: 'Ear Tag' },
    { field: 'sex', header: 'Gender' },
    { field: 'pen', header: 'Pen' },
    { field: 'status', header: 'Status' },
    { field: 'lastEventDate', header: 'Last Event' },
  ];

  constructor(
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cows$ = this.state$.pipe(
      tap((state) => {
        this.loading = true;
        this.page = state.page;
        this.rows = state.rows;
      }),

      switchMap((state) => this.cowService.getPagedCows(state.page, state.rows, state.filters)),

      tap((result) => {
        this.totalRecords = result.total;
        this.loading = false;
      }),

      map((result) =>
        result.data.map(
          (cow): CowRowVM => ({
            id: cow.id,
            sex: humanize(cow.sex),
            pen: humanize(cow.pen),
            status: humanize(cow.status),
            lastEventDate: cow.lastEventDate
              ? formatDate(cow.lastEventDate, 'd MMM y', 'en-US')
              : '—',
          }),
        ),
      ),

      takeUntil(this.destroy$),
    );
  }

  private deriveStateFromParams(params: ParamMap): {
    page: number;
    rows: number;
    filters: CowFilters;
  } {
    return {
      page: +(params.get('page') ?? 0),
      rows: +(params.get('rows') ?? 10),
      filters: {
        search: params.get('search'),
        status: params.get('status') as CowStatus | null,
        pen: params.get('pen') as CowPen | null,
      },
    };
  }

  private stateKey(state: { page: number; rows: number; filters: CowFilters }): string {
    return JSON.stringify(state);
  }

  onSearch(value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: value || null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onStatusChange(status: CowStatus | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status: status || null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPenChange(pen: CowPen | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pen: pen || null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: { page: number; rows: number }): void {
    const isRowsChanged = event.rows !== this.rows;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: isRowsChanged ? null : event.page > 0 ? event.page : null,
        rows: event.rows !== 10 ? event.rows : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onAddCow(): void {
    this.router.navigate(['/cows/create'], {
      queryParams: {
        returnUrl: this.router.url,
      },
    });
  }

  rowClick(cow: CowRowVM): void {
    this.router.navigate(['/cows', cow.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}