import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { GroupMember } from '@pages/home/models/member.model';
@Component({
  selector: 'status-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './status-table.component.html',
  styleUrl: './status-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTableComponent implements OnInit {
  @Input() members: GroupMember[] = [];
  @Input() currentMember: GroupMember | null = null;
  @Output() memberCheckedOut = new EventEmitter<string>();

  ngOnInit(): void {}

  displayedColumns: string[] = ['First Name', 'Last Name', 'Status', 'Actions'];

  checkoutMember(memberId: string): void {
    this.memberCheckedOut.emit(memberId);
  }
}
