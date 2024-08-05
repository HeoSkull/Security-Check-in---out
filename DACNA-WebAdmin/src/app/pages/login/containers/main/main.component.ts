import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

import { ServerResponse } from 'src/app/models/http-response.model';

import { UserService } from '@services/user.service';
import { LoginModel } from '@models/user.model';
import { LoginFormComponent } from '../../components/form/form.component';

import { NotificationDialogComponent } from 'src/app/components/notification-dialog/notification-dialog.component';

@Component({
  selector: 'login-main',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoginFormComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginMainComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private loginService: UserService
  ) {}

  ngOnInit(): void {}

  loginUserSuccesfully = (response: ServerResponse) => {
    if (response.status === 200) {
      this.dialog.open(NotificationDialogComponent, {
        data: {
          title: 'Success',
          message: 'User logged in successfully',
        },
      });

      setTimeout(() => {
        this.router.navigate(['main']);
        this.dialog.closeAll();
      }, 1000);
    }
  };

  loginUserFailed = (response: ServerResponse) => {
    this.dialog.open(NotificationDialogComponent, {
      data: {
        title: 'Error',
        message: `Error: ${response.message}\n${response.error}`,
      },
    });
  };

  loginUser(user: LoginModel) {
    const loginUserSubscription = this.loginService.loginUser(user).subscribe({
      next: this.loginUserSuccesfully,
      error: this.loginUserFailed,
      complete: () => {
        loginUserSubscription.unsubscribe();
      },
    });
  }
}
