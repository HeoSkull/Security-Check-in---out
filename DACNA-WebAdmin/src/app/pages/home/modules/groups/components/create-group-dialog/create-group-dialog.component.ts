import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { CreateGroupDialogData } from '../../models/groups-dialog.model';

@Component({
  selector: 'app-create-group-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateGroupDialogData
  ) {}

  createGroupForm = new FormGroup({
    groupName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    groupDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(256),
    ]),
  });

  get groupName() {
    return this.createGroupForm.get('groupName');
  }

  get groupDescription() {
    return this.createGroupForm.get('groupDescription');
  }

  ngOnInit(): void {}

  onCancleClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.createGroupForm.valid) {
      this.dialogRef.close({
        name: this.groupName?.value,
        description: this.groupDescription?.value,
      });
    }
  }
}
