import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ServerResponse } from 'src/app/models/http-response.model';

import { RegisterFormComponent } from '../../components/form/form.component';
import { UserService } from '@services/user.service';
import { RegisterModel } from '@models/user.model';

// Dialog
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/components/notification-dialog/notification-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'register-main',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterMainComponent {
  constructor(
    private registerService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  registerUserSuccesfully = (response: ServerResponse) => {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: {
        title: 'Register Successfully',
        message: 'You will be redirected to the login page.',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  };

  registerUserFailed = (response: ServerResponse) => {
    this.dialog.open(NotificationDialogComponent, {
      data: {
        title: 'Register Failed',
        message: `Error: ${response.message}\n${response.error}`,
      },
    });
  };

  registerUser(user: RegisterModel) {
    const registerUserSubscription = this.registerService
      .registerUser(user)
      .subscribe({
        next: this.registerUserSuccesfully,
        error: this.registerUserFailed,
        complete: () => {
          registerUserSubscription.unsubscribe();
        },
      });
  }
}
