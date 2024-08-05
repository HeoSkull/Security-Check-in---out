import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { GroupMainComponent } from './containers/group-main/group-main.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, GroupMainComponent],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  ngOnInit(): void {}
}
