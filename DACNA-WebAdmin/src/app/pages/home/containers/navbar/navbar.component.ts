import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models/user.model';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

import { AvatarComponent } from '../../components/avatar/avatar.component';
import { ComfirmLogoutComponent } from '../../components/comfirm-logout/comfirm-logout.component';

@Component({
  selector: 'home-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule, AvatarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNavbarComponent {
  @Input() open = true;
  @Input() user: User | null = null;

  @Output() onLogout = new EventEmitter<void>();
  @Output() onToggle = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private router: Router) {}

  handleLogout(): void {
    const dialogRef = this.dialog.open(ComfirmLogoutComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.onLogout.emit();
    });
  }

  handleMyAccount(): void {
    this.router.navigate(['/account']);
  }

  handleToggle(): void {
    this.onToggle.emit();
  }
}
