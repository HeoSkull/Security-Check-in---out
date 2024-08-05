import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

//components
import { MembersComponent } from './containers/members/members.component';
import { StatusComponent } from './containers/status/status.component';
import { AddMemberDialogComponent } from './components/AddMemberDialog/AddMemberDialog.component';
import { GroupQRComponent } from './components/GroupQR/GroupQR.component';

// ngrx
import { CurrentMemberState } from '@pages/home/ngrx/current-member/current-member.state';
import { CurrentMemberActions } from '@pages/home/ngrx/current-member/current-member.actions';

import { GroupsState } from '@pages/home/ngrx/groups/groups.state';
import { GroupsActions } from '@pages/home/ngrx/groups/groups.actions';

import { MembersState } from '@pages/home/ngrx/members/members.state';
import { MembersActions } from '@pages/home/ngrx/members/members.actions';
import { User } from '@models/user.model';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, MaterialModule, MembersComponent, StatusComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{
      groups: GroupsState;
      members: MembersState;
      currentMember: CurrentMemberState;
    }>
  ) {}

  groupState = toSignal(
    this.store.select((state) => state.groups.currentGroup)
  );

  currentMemberState = toSignal(
    this.store.select((state) => state.currentMember.currentMember)
  );

  membersState = toSignal(this.store.select((state) => state.members));

  tabs = [
    { label: 'Members', icon: 'group', component: MembersComponent },
    { label: 'Status', icon: 'info', component: StatusComponent },
  ];

  ngOnInit(): void {
    const groupID = this.router.url.split('/').pop();

    if (groupID) {
      this.store.dispatch(GroupsActions.loadGroup({ group_id: groupID }));
      this.store.dispatch(
        CurrentMemberActions.getMember({ group_id: groupID })
      );
    }
  }

  onCreateQRCode(): void {
    this.dialog.open(GroupQRComponent, {
      data: {
        groupName: this.groupState()?.name,
        qrCode: this.groupState()?.id,
      },
    });
  }

  onFindMember(): void {
    const dialogRef = this.dialog.open<AddMemberDialogComponent, any, User[]>(
      AddMemberDialogComponent,
      { width: '400px', data: { group_id: this.groupState()?.id! } }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const users_id = result.map((user) => user.id);

        this.store.dispatch(
          MembersActions.addMembers({
            group_id: this.groupState()?.id!,
            users_id,
          })
        );
      }
    });
  }
}
