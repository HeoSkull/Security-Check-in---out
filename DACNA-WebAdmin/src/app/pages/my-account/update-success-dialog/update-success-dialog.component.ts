import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-update-success-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './update-success-dialog.component.html',
  styleUrl: './update-success-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSuccessDialogComponent implements OnInit {
  ngOnInit(): void {}
}
