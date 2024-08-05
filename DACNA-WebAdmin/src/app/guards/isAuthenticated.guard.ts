import { Router, type CanActivateFn } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '@enviroments/environment.development';
import { catchError, map, of } from 'rxjs';

import { ServerResponse } from '../models/http-response.model';

const apiUrl = environment.apiUrl;
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const httpClient = inject(HttpClient);
  const router = inject(Router);

  return httpClient
    .get<ServerResponse>(`${apiUrl}/user/check-user`, {
      observe: 'response',
      responseType: 'json',
    })
    .pipe(
      map((response: HttpResponse<ServerResponse>) => {
        if (response.status === 200) {
          router.navigate(['/']);
          return false;
        }

        return true;
      }),
      catchError((e) => {
        return of(true);
      })
    );
};
