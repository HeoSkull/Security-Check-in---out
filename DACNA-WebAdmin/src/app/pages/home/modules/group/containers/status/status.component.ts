import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { StatusTableComponent } from '../../components/status-table/status-table.component';

import { GroupMember } from '@pages/home/models/member.model';
import { MembersState } from '@pages/home/ngrx/members/members.state';
import { MembersActions } from '@pages/home/ngrx/members/members.actions';
import { CurrentMemberState } from '@pages/home/ngrx/current-member/current-member.state';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, LetDirective, StatusTableComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements OnInit {
  groupID?: string;

  members: GroupMember[] = [];
  membersState$!: Observable<MembersState>;

  currentMember = toSignal(
    this.store.select((state) => state.currentMember.currentMember)
  );

  constructor(
    private router: Router,
    private store: Store<{
      members: MembersState;
      currentMember: CurrentMemberState;
    }>
  ) {}

  ngOnInit(): void {
    this.groupID = this.router.url.split('/').pop();
    this.store.dispatch(
      MembersActions.loadMembers({ group_id: this.groupID! })
    );
    this.membersState$ = this.store.select((state) => state.members);
  }
}
