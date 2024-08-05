import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { Observable, map } from 'rxjs';

//Material
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

//components
import { GroupTableComponent } from '../../components/group-table/group-table.component';
import { CreateGroupDialogComponent } from '../../components/create-group-dialog/create-group-dialog.component';

// models
import { GroupsState } from '@pages/home/ngrx/groups/groups.state';
import { GroupsActions } from '@pages/home/ngrx/groups/groups.actions';
import { PageEvent } from '@angular/material/paginator';
import { UserState } from 'src/app/ngrx/user.state';
import { ComfirmDialogComponent } from 'src/app/components/comfirm-dialog/comfirm-dialog.component';
import { UpdateGroupDialogComponent } from '../../components/update-group-dialog/update-group-dialog.component';
import { Group } from '@pages/home/models/group.model';

@Component({
  selector: 'group-main',
  standalone: true,
  imports: [CommonModule, LetDirective, MaterialModule, GroupTableComponent],
  templateUrl: './group-main.component.html',
  styleUrl: './group-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupMainComponent implements OnInit {
  groupsState$!: Observable<GroupsState>;

  user$ = this.store.select((state) => state.users.user);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{
      groups: GroupsState;
      users: UserState;
    }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GroupsActions.loadGroups({}));
    this.groupsState$ = this.store.select((state) => state.groups);
  }

  handleGroupSelected(id: string): void {
    this.router.navigate([`main/group/${id}`]);
  }

  handleGroupEdited(group: Group): void {
    const dialogRef = this.dialog.open(UpdateGroupDialogComponent, {
      width: '400px',
      data: {
        name: group.name,
        description: group.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          GroupsActions.updateGroup({
            group_id: group.id,
            name: result.name,
            description: result.description,
          })
        );
      }
    });
  }

  handleGroupDeleted(id: string): void {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Group',
        message: 'Are you sure you want to delete this group?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(GroupsActions.deleteGroup({ group_id: id }));
      }
    });
  }

  handleAddGroup(): void {
    const createGroupDialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '400px',
      data: { name: '', description: '' },
    });

    createGroupDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          GroupsActions.addGroup({
            name: result.name,
            description: result.description,
          })
        );
      }
    });
  }

  handleOnPaginate(event: PageEvent): void {
    this.store.dispatch(
      GroupsActions.loadGroups({
        currentPage: event.pageIndex + 1,
        perPage: event.pageSize,
      })
    );
  }
}
