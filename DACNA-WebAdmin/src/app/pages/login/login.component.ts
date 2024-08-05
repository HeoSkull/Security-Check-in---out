import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginMainComponent } from './containers/main/main.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginMainComponent],
  template: `<login-main></login-main>`,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
