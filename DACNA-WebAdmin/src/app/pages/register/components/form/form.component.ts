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
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/modules/material/material.module';

import { passwordMatchingValidatior } from '../../helper/validatePassword';
import { RegisterModel } from '@models/user.model';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$'
        ),
      ]),
    },
    { validators: passwordMatchingValidatior }
  );

  @Output() register = new EventEmitter<RegisterModel>();

  isSubmitted = false;

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid =
        control.touched &&
        this.registerForm.get('confirmPassword')!.touched &&
        this.registerForm.invalid;
      return controlInvalid || formInvalid;
    },
  };

  comfirmPasswordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid =
        control.touched &&
        this.registerForm.get('password')!.touched &&
        this.registerForm.invalid;
      return controlInvalid || formInvalid;
    },
  };

  submit() {
    this.registerForm.markAsTouched();

    if (this.registerForm.valid) {
      const { username, email, password, firstName, lastName, phoneNumber } =
        this.registerForm.value;

      if (
        username &&
        email &&
        password &&
        firstName &&
        lastName &&
        phoneNumber
      ) {
        const registerModel: RegisterModel = {
          username,
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
        };

        this.register.emit(registerModel);
      }
    }
  }
}
