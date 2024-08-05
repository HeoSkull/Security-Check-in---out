import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RegisterMainComponent } from './containers/main/main.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterMainComponent],
  template: `<register-main></register-main>`,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
