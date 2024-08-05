import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Models
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { BehaviorSubject, delay, map, switchMap } from 'rxjs';

import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-add-member-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './AddMemberDialog.component.html',
  styleUrl: './AddMemberDialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemberDialogComponent implements OnInit {
  constructor(
    private readonly _dialogRef: MatDialogRef<AddMemberDialogComponent, User[]>,
    private readonly _userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: { group_id: string }
  ) {}

  search$ = new BehaviorSubject<string>('');
  selectedUsers: User[] = [];

  users = toSignal(
    this.search$.pipe(
      // Debounce the search. Prevents the search from being triggered on every key stroke too fast.
      delay(300),
      // Cancel the previous search if a new search is triggered.
      switchMap((search) =>
        this._userService.searchUser(
          search,
          this.data.group_id,
          this.selectedUsers.map((u) => u.id)
        )
      ),
      // Map the response to the data we need.
      map((res) => res.data)
    )
  );

  ngOnInit(): void {}

  handleInput($event: InputEvent) {
    const value = ($event.target as HTMLInputElement).value;
    this.search$.next(value);
  }

  handleSelectUser(user: User): void {
    const index = this.selectedUsers.findIndex((u) => u.id === user.id);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
    this.search$.next(this.search$.value);
  }

  handleRemoveUser(user: User): void {
    const index = this.selectedUsers.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    }
    this.search$.next(this.search$.value);
  }

  handleCancel(): void {
    this._dialogRef.close();
  }

  handleAddMembers(): void {
    this._dialogRef.close(this.selectedUsers);
  }
}
