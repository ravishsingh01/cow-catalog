import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cow, CowEvent } from '../../models/cow.model';
import { CowService } from '../../services/cow.service';

@Component({
  selector: 'app-cow-detail',
  templateUrl: './cow-detail.component.html',
  styleUrls: ['./cow-detail.component.scss']
})
export class CowDetailComponent implements OnInit {

  cow!: Cow;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cowService: CowService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.navigateBack();
      return;
    }

    const cow = this.cowService.getCowById(id);

    if (!cow) {
      this.navigateBack();
      return;
    }

    this.cow = cow;
  }

  private navigateBack(): void {
    this.router.navigate(['/cows']);
  }
  get dailyWeightGain(): string {
    // No historical data 
    return '—';
  }

  trackByEvent(index: number, event: CowEvent): string {
    return `${event.type}-${event.date}`;
  }


}
