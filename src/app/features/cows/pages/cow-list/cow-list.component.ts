import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cow } from '../../models/cow.model';
import { CowService } from '../../services/cow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent implements OnInit {

  cows$!: Observable<Cow[]>;

  columns = [
    { field: 'id', header: 'Ear Tag' },
    { field: 'sex', header: 'Sex' },
    { field: 'pen', header: 'Pen' },
    { field: 'status', header: 'Status' },
    { field: 'lastEventDate', header: 'Last Event' }
  ];

  page = 0;
  rows = 10;
  totalRecords = 0;
  loading = false;

  constructor(
    private cowService: CowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCows();
  }

  onAddCow(): void {
    this.router.navigate(['/cows/new']);
  }

  rowClick(cow: Cow): void {
    this.router.navigate(['/cows', cow.id]);
  }

  onPageChange(event: { page: number; rows: number }): void {
    this.page = event.page;
    this.rows = event.rows;
    this.loadCows();
  }

  loadCows(): void {
    this.loading = true;
    this.cowService
      .getPagedCows(this.page, this.rows)
      .subscribe(result => {
        this.cows$ = of(result.data);
        this.totalRecords = result.total;
        this.loading = false;
      });
  }


}
