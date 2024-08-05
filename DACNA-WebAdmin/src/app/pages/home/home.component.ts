import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatSidenav } from '@angular/material/sidenav';

// Components
import { HomeNavbarComponent } from './containers/navbar/navbar.component';
import { HomeSidebarComponent } from './containers/sidebar/sidebar.component';

// Services
import { UserService } from '@services/user.service';

// ngrx
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/ngrx/user.state';
import { UsersActions } from 'src/app/ngrx/user.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,

    HomeNavbarComponent,
    HomeSidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @ViewChild('sidenav') sidebar!: MatSidenav;

  @ViewChild('mainMask') mainMaskElement!: ElementRef<HTMLDivElement>;
  @ViewChild('main') mainElement!: ElementRef<HTMLDivElement>;

  resizeObserver!: ResizeObserver;
  previousMaskHeight = 0;

  user$ = this.store.select((state) => state.users.user);
  currentRoute$ = new BehaviorSubject<string>('dashboard');

  constructor(
    private store: Store<{ users: UserState }>,
    private userService: UserService,
    private router: Router
  ) {}

  initRoute(): void {
    const currentRoute = this.router.url.split('/')[2];

    if (currentRoute) {
      this.currentRoute$.next(currentRoute);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute$.next(event.url.split('/')[2]);
      }
    });
  }

  initMainResizeObserver(): void {
    this.resizeObserver = new ResizeObserver((c) => {
      const h = c[0].borderBoxSize[0].blockSize;

      this.mainMaskElement.nativeElement.animate(
        [{ height: `${this.previousMaskHeight}px` }, { height: `${h}px` }],
        {
          duration: 300,
          easing: 'ease-in-out',
          direction: 'normal',
          fill: 'forwards',
        }
      );

      this.previousMaskHeight = h;
    });

    this.resizeObserver.observe(this.mainElement.nativeElement);
  }

  ngOnInit(): void {
    this.initRoute();
    this.store.dispatch(UsersActions.getUser());
  }

  ngAfterViewInit(): void {
    this.initMainResizeObserver();
  }

  handleNavigate(route: string): void {
    this.router.navigate(['main', route]);
  }

  handleLogout(): void {
    this.userService.logoutUser().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
