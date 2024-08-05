import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  type OnInit,
} from '@angular/core';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
    }
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
