import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Signal,
  type OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { GroupMember } from '@pages/home/models/member.model';
import { WorkdayHistoryActions } from '@pages/home/ngrx/workday-history/workday-history.actions';
import { WorkdayHistoryState } from '@pages/home/ngrx/workday-history/workday-history.state';

import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LetDirective,
  ],
  templateUrl: './member-history.component.html',
  styleUrl: './member-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberHistoryComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<MemberHistoryComponent, never>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      group_id: string;
      member: GroupMember;
    },
    private store: Store<{ workdayHistories: WorkdayHistoryState }>
  ) {}

  options = [
    { value: '3', viewValue: 'Past 3 days' },
    { value: '7', viewValue: 'Past 7 days' },
    { value: '15', viewValue: 'Past 15 days' },
    { value: '30', viewValue: 'Past 30 days' },
  ];

  workdayHistoryState$ = this.store.select((state) => state.workdayHistories);

  ngOnInit(): void {
    this.store.dispatch(
      WorkdayHistoryActions.loadWorkdayHistoryByDays({
        groupID: this.data.group_id,
        user_id: this.data.member.id,
        days: '3',
      })
    );
  }

  handleValueChanged($event: string) {
    this.store.dispatch(
      WorkdayHistoryActions.loadWorkdayHistoryByDays({
        groupID: this.data.group_id,
        user_id: this.data.member.id,
        days: $event,
      })
    );
  }

  handleOnClose() {
    this.dialogRef.close();
  }
}
