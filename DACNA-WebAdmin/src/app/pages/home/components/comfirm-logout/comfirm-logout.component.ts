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
  selector: 'app-comfirm-logout',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './comfirm-logout.component.html',
  styleUrl: './comfirm-logout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComfirmLogoutComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ComfirmLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
