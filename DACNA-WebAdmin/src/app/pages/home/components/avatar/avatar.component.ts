import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
} from '@angular/core';

@Component({
  selector: 'home-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() src: string | undefined = '';

  @Output('logout') onLogout = new EventEmitter<void>();
  @Output('account') onAccount = new EventEmitter<void>();

  ngOnInit(): void {}
}
