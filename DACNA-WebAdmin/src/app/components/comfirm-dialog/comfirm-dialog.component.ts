import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-comfirm-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './comfirm-dialog.component.html',
  styleUrl: './comfirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComfirmDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ComfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
