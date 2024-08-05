import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'home-sidebar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSidebarComponent implements OnInit {
  @Input() currentRoute: string = 'dashboard';
  @Output() onNavigate = new EventEmitter<string>();

  sidebarButtons = [
    { label: 'Dashboard', icon: 'home', route: 'dashboard' },
    { label: 'Groups', icon: 'list', route: 'groups' },
  ];

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.onNavigate.emit(route);
  }
}
