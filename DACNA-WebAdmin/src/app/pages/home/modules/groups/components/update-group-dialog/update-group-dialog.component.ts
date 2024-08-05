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

import { UpdateGroupDialogData } from '../../models/groups-dialog.model';

@Component({
  selector: 'app-update-group-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './update-group-dialog.component.html',
  styleUrl: './update-group-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateGroupDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UpdateGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateGroupDialogData
  ) {}

  updateGroupForm = new FormGroup({
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
    return this.updateGroupForm.get('groupName');
  }

  get groupDescription() {
    return this.updateGroupForm.get('groupDescription');
  }

  ngOnInit(): void {
    console.log(this.data);
    this.groupName?.setValue(this.data.name);
    this.groupDescription?.setValue(this.data.description);
  }

  onCancleClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.updateGroupForm.valid) {
      this.dialogRef.close({
        name: this.groupName?.value,
        description: this.groupDescription?.value,
      });
    }
  }
}
