import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GroupMember } from '@pages/home/models/member.model';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { WorkdayStatisticialActions } from '@pages/home/ngrx/workday-statisticial/workday-statistical.actions';
import { WorkdayStatisticialState } from '@pages/home/ngrx/workday-statisticial/workday-statistical.state';
import { ToHoursPipe } from '../../toHours.pipe';

@Component({
  selector: 'app-member-statistical',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    MaterialModule,
    ToHoursPipe,
  ],
  templateUrl: './member-statistical.component.html',
  styleUrl: './member-statistical.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberStatisticalComponent implements OnInit {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  workdayStatisticialState$ = this.store.select(
    (state) => state.workdayStatisticial
  );

  displayedColumns: string[] = [
    'Username',
    'First Name',
    'Last Name',
    'Email',
    'Date',
    'Check In',
    'Check Out',
    'Total',
  ];

  constructor(
    private dialogRef: MatDialogRef<MemberStatisticalComponent, never>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      group_id: string;
      member: GroupMember;
    },
    private store: Store<{ workdayStatisticial: WorkdayStatisticialState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      WorkdayStatisticialActions.loadWorkdayStatisticial({
        groupID: this.data.group_id,
        user_id: this.data.member.id,
      })
    );

    this.range.valueChanges.subscribe(() => this.handleOnValueChange());
  }

  handleOnValueChange(): void {
    const { start, end } = this.range.value;

    let startStr = '';
    let endStr = '';

    if (start) {
      const _temp = new Date(
        start.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      );

      const _days = _temp.getDate();
      const _months = _temp.getMonth() + 1;
      const _years = _temp.getFullYear();

      startStr = `${_years}-${_months < 10 ? `0${_months}` : _months}-${
        _days < 10 ? `0${_days}` : _days
      }`;
    }

    if (end) {
      const _temp = new Date(
        end.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      );

      const _days = _temp.getDate() + 1;
      const _months = _temp.getMonth() + 1;
      const _years = _temp.getFullYear();

      endStr = `${_years}-${_months < 10 ? `0${_months}` : _months}-${
        _days < 10 ? `0${_days}` : _days
      }`;
    }

    this.store.dispatch(
      WorkdayStatisticialActions.loadWorkdayStatisticial({
        groupID: this.data.group_id,
        user_id: this.data.member.id,
        start: startStr === '' ? undefined : startStr,
        end: endStr === '' ? undefined : endStr,
      })
    );
  }
}
