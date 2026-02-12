import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() showBack = false;
  @Input() fallbackUrl = '/';
  constructor(
    private location: Location,
    private router: Router,
  ) {}

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl(this.fallbackUrl);
    }
  }
}
