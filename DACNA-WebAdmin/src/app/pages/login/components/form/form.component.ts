import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  type OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginModel } from '@models/user.model';

import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  showPassword: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  @Output() login = new EventEmitter<LoginModel>();

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleShowPassword(event: any) {
    event.preventDefault();

    if (event?.pointerType) {
      this.showPassword = !this.showPassword;
    }
  }

  handleKeyDownSubmit(event: any) {
    if (!this.loginForm.valid) return;
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  submit() {
    this.loginForm.markAsTouched();

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username && password) {
        const loginModel: LoginModel = {
          username,
          password,
        };

        this.login.emit(loginModel);
      }
    }
  }
}
