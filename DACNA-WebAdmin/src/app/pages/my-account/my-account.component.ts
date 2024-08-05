import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LetDirective } from '@ngrx/component';

// Models
import { UpdateUser } from '@models/user.model';

// ngrx
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/ngrx/user.state';
import { UsersActions } from 'src/app/ngrx/user.actions';

// Material
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';

// Components
import { UpdateSuccessDialogComponent } from './update-success-dialog/update-success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LetDirective,
    MaterialModule,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountComponent implements OnInit {
  constructor(
    private store: Store<{ users: UserState }>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  isEditing = false;
  isChanged = false;
  initialValues: any;

  user$ = this.store.select((state) => state.users.user);
  isLoading$ = this.store.select((state) => state.users.isLoading);
  isUpdateSuccess$ = this.store.select((state) => state.users.isUpdateSuccess);

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUser());
    this.user$.subscribe((user) => {
      if (user) {
        this.userForm.patchValue(user);
        this.userForm.markAsPristine();
        this.initialValues = this.userForm.value;
      }
    });
    this.userForm.disable();
    this.userForm.valueChanges.subscribe((value) => {
      if (!this.initialValues) return;
      this.isChanged = Object.keys(this.initialValues).some((key) => {
        return this.initialValues[key] !== value[key as keyof typeof value];
      });
      console.log(this.isChanged);
    });
    this.isUpdateSuccess$.subscribe((isSuccess) => {
      if (isSuccess) {
        this.dialog.open(UpdateSuccessDialogComponent);
        this.isEditing = false;
        this.userForm.disable();
        this.userForm.markAsPristine();
        this.store.dispatch(UsersActions.refreshUpdateSuccess());
      }
    });
  }

  userForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$'
      ),
    ]),
  });

  get username() {
    return this.userForm.get('username');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  handleTurnOnEditing() {
    this.isEditing = true;
    this.userForm.enable();
  }

  handleSaveChanges() {
    const value = this.userForm.value;

    const updateUser: UpdateUser = {
      username: value.username,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
    };

    this.store.dispatch(UsersActions.updateUser({ user: updateUser }));
  }

  handleCancelEditing() {
    this.isEditing = false;
    this.userForm.patchValue(this.initialValues);
    this.userForm.disable();
    this.userForm.markAsPristine();
  }

  handleGoBack() {
    if (window.history.length > 1) {
      window.history.back();
    }
    this.router.navigate(['/']);
  }
}
