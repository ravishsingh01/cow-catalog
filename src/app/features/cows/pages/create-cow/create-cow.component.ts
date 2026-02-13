import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cow, CowEvent, CowSex, CowStatus } from '../../models/cow.model';
import { CowService } from '../../services/cow.service';
import { COW_PEN_OPTIONS, COW_STATUS_OPTIONS ,COW_WEIGHT_MIN,COW_WEIGHT_MAX, COW_CREATE_STATUS_OPTIONS} from 'src/app/core/constants/cow.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-cow',
  templateUrl: './create-cow.component.html',
  styleUrls: ['./create-cow.component.scss'],
})
export class CreateCowComponent {
  @ViewChild(FormGroupDirective)
  private formDirective!: FormGroupDirective;
  form: FormGroup;
  readonly createCowStatusOptions = COW_CREATE_STATUS_OPTIONS;
  readonly penOptions = COW_PEN_OPTIONS;
  readonly WEIGHT_MIN = COW_WEIGHT_MIN;
  readonly WEIGHT_MAX = COW_WEIGHT_MAX;
  submitAction: 'SAVE' | 'SAVE_AND_ADD' = 'SAVE';
  readonly DEFAULT_COW_STATE = {
    id: '',
    sex: 'MALE' as CowSex,
    pen: null,
    status: 'ACTIVE' as CowStatus,
    weight: null,
  };
  submitting = false;
  constructor(
    private fb: FormBuilder,
    private cowService: CowService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      id: [this.DEFAULT_COW_STATE.id, [Validators.required, this.earTagUniqueValidator()]],
      sex: [this.DEFAULT_COW_STATE.sex, Validators.required],
      pen: [this.DEFAULT_COW_STATE.pen, Validators.required],
      status: [this.DEFAULT_COW_STATE.status, Validators.required],
      weight: [
        this.DEFAULT_COW_STATE.weight,
        [Validators.min(COW_WEIGHT_MIN), Validators.max(COW_WEIGHT_MAX)],
      ],
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
            message: 'This ear tag is already taken',
          },
        };
      }

      return null;
    };
  }

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const raw = this.form.getRawValue();
    const now = new Date().toISOString();

    const events: CowEvent[] = [];

    events.push({
      type: 'REGISTERED',
      date: now,
      note: 'Cow registered',
    });

    if (raw.weight) {
      events.push({
        type: 'WEIGHT',
        date: now,
        value: Number(raw.weight),
        note: `Weight recorded (${Number(raw.weight)} kg)`,
      });
    }

    if (raw.status === 'IN_TREATMENT') {
      events.push({
        type: 'TREATMENT',
        date: now,
        note: 'Cow put under treatment',
      });
    }
    // DECEASED status cannot be set at creation, so no need to handle that case here.

    const cow: Cow = {
      id: raw.id.toString().trim(),
      sex: raw.sex,
      pen: raw.pen,
      status: raw.status,
      weight: raw.weight ? Number(raw.weight) : undefined,
      events,
      lastEventDate: events[events.length - 1].date,
    };

    this.cowService.addCow(cow);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/cows';

    if (this.submitAction === 'SAVE_AND_ADD') {
       this.submitting = false;
      this.resetFormForNextEntry();
      return;
    }

    this.router.navigateByUrl(returnUrl);
  }

  private resetFormForNextEntry(): void {
    this.formDirective.resetForm(this.DEFAULT_COW_STATE);
  }

  cancel(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/cows';

    this.router.navigateByUrl(returnUrl);
  }
}
