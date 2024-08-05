import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  type OnInit,
} from '@angular/core';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GroupMember } from '@pages/home/models/member.model';

@Component({
  selector: 'information-member-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MemberDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public member: GroupMember
  ) {}

  ngOnInit(): void {}

  onOkClick(): void {
    this.dialogRef.close();
  }
}
