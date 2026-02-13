import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cow, CowEvent } from '../../models/cow.model';
import { CowService } from '../../services/cow.service';
import { HumanizePipe } from 'src/app/shared/pipes/humanize.pipe';

@Component({
  selector: 'app-cow-detail',
  templateUrl: './cow-detail.component.html',
  styleUrls: ['./cow-detail.component.scss'],
})
export class CowDetailComponent implements OnInit {
  cow!: Cow;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cowService: CowService,
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

  trackByEvent(index: number, event: CowEvent): string {
    return `${event.type}-${event.date}`;
  }

  get dailyWeightGain(): string {
    const weightEvents = this.cow.events
      ?.filter((e) => e.type === 'WEIGHT' && (e as any).value !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (!weightEvents || weightEvents.length < 2) {
      return '—';
    }

    const first = weightEvents[0] as any;
    const last = weightEvents[weightEvents.length - 1] as any;

    const days =
      (new Date(last.date).getTime() - new Date(first.date).getTime()) / (1000 * 60 * 60 * 24);

    if (days <= 0) return '—';

    const gain = (last.value - first.value) / days;
    return `${gain.toFixed(2)} kg/day`;
  }
}
