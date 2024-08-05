import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

// ngrx
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';

import { MembersState } from '@pages/home/ngrx/members/members.state';
import { MembersActions } from '@pages/home/ngrx/members/members.actions';

import { CurrentMemberState } from '@pages/home/ngrx/current-member/current-member.state';

// rxjs
import { Observable } from 'rxjs';

// components
import { MembersTableComponent } from '../../components/members-table/members-table.component';
import { MemberDetailComponent } from '../../components/member-detail/member-detail.component';
import { ComfirmDialogComponent } from 'src/app/components/comfirm-dialog/comfirm-dialog.component';

// models
import { GroupMember } from '@pages/home/models/member.model';
import { MemberHistoryComponent } from '../../components/member-history/member-history.component';
import { MemberStatisticalComponent } from '../../components/member-statistical/member-statistical.component';

@Component({
  selector: 'group-members',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MembersTableComponent,
    MemberDetailComponent,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent implements OnInit {
  groupID?: string;

  members: GroupMember[] = [];
  membersState$!: Observable<MembersState>;

  currentMember = toSignal(
    this.store.select((state) => state.currentMember.currentMember)
  );

  constructor(
    private router: Router,
    private dialog: MatDialog,
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

  async handleMemberSelected(id: string): Promise<void> {
    this.store.dispatch(
      MembersActions.loadMember({ group_id: this.groupID!, member_id: id })
    );

    const stateSubscription = this.membersState$.subscribe((state) => {
      if (state.isLoading) return;

      const currentSelectedMember = state.currentSelectedMember;

      this.dialog.open(MemberDetailComponent, {
        data: currentSelectedMember,
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
      });

      stateSubscription.unsubscribe();
    });
  }

  async handleViewMemberHistory(member: GroupMember): Promise<void> {
    this.dialog.open(MemberHistoryComponent, {
      data: {
        group_id: this.groupID!,
        member: member,
      },
      width: '1200px',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
    });
  }

  async handleViewMemberStatistical(member: GroupMember) {
    this.dialog.open(MemberStatisticalComponent, {
      data: {
        group_id: this.groupID!,
        member: member,
      },
      width: '1400px',
      maxWidth: '1400px',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
    });
  }

  async handleMemberDeleted(id: string): Promise<void> {
    const dialogRef = this.dialog.open<ComfirmDialogComponent, any, boolean>(
      ComfirmDialogComponent,
      {
        data: {
          title: 'Delete Member?',
          message: 'Are you sure you want to delete this member?',
        },
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          MembersActions.deleteMember({
            group_id: this.groupID!,
            member_id: id,
          })
        );
      }
    });
  }
}
