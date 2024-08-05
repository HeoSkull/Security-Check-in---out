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
  selector: 'members-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './members-table.component.html',
  styleUrl: './members-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent implements OnInit {
  @Input() members: GroupMember[] = [];
  @Input() currentMember: GroupMember | null = null;

  @Output() memberSelected = new EventEmitter<string>();
  @Output() memberHistorySelected = new EventEmitter<GroupMember>();
  @Output() memberStatisticalSelected = new EventEmitter<GroupMember>();
  @Output() memberDeleted = new EventEmitter<string>();

  ngOnInit(): void {
    console.log(this.currentMember);
  }

  displayedColumns: string[] = ['First Name', 'Last Name', 'Role', 'Actions'];

  selectMember(memberId: string): void {
    this.memberSelected.emit(memberId);
  }

  viewMemberHistory(member: GroupMember): void {
    this.memberHistorySelected.emit(member);
  }

  viewMemberStatistical(member: GroupMember): void {
    this.memberStatisticalSelected.emit(member);
  }

  deleteMember(memberId: string): void {
    this.memberDeleted.emit(memberId);
  }
}
