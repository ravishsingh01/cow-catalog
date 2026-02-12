import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cow, CowSex, CowStatus } from '../../models/cow.model';
import { CowService } from '../../services/cow.service';
import { COW_PEN_OPTIONS, COW_STATUS_OPTIONS ,COW_WEIGHT_MIN,COW_WEIGHT_MAX} from 'src/app/core/constants/cow.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-cow',
  templateUrl: './create-cow.component.html',
  styleUrls: ['./create-cow.component.scss']
})
export class CreateCowComponent {

  form: FormGroup;
  readonly statusOptions = COW_STATUS_OPTIONS;
  readonly penOptions = COW_PEN_OPTIONS;
  readonly WEIGHT_MIN = COW_WEIGHT_MIN;
  readonly WEIGHT_MAX = COW_WEIGHT_MAX;

  constructor(
    private fb: FormBuilder,
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: ['', [Validators.required, this.earTagUniqueValidator()]],
      sex: ['MALE' as CowSex, Validators.required],
      pen: [null, Validators.required],
      status: ['ACTIVE' as CowStatus, Validators.required],
      weight: [null, [ Validators.min(COW_WEIGHT_MIN),Validators.max(COW_WEIGHT_MAX) ]]
    });
  }

  private earTagUniqueValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = (control.value || '').toString().trim();
      if (!value) return null;

      const exists = this.cowService.getCowById(value);

      if (exists) {
        return {
          earTagTaken: {
            message: 'This ear tag is already taken'
          }
        };
      }

      return null;
    };
  }


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const cow: Cow = {
      id: raw.id.toString().trim(),
      sex: raw.sex,
      pen: raw.pen,
      status: raw.status,
      weight: raw.weight ? Number(raw.weight) : undefined,
      lastEventDate: new Date().toISOString()
    };

    this.cowService.addCow(cow);
    const returnUrl =
    this.route.snapshot.queryParamMap.get('returnUrl') || '/cows';
    this.router.navigateByUrl(returnUrl);
  }

  cancel(): void {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/cows';

    this.router.navigateByUrl(returnUrl);
  }
}
