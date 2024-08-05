import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  //Console log the request
  const started = Date.now();
  const { method, url } = req;

  //console log the request with color
  console.log(
    `%c ${method} %c ${url}`,
    'color: #4CAF50; font-weight: bold',
    'color: #9E9E9E; font-weight: bold'
  );

  return next(req).pipe(
    //Console log the response
    tap((events) => {
      if (events instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        const { status, statusText } = events;
        console.log(
          `%c ${method} %c ${url} %c ${status} %c ${statusText} %c ${elapsed}ms`,
          'color: #4CAF50; font-weight: bold',
          'color: #9E9E9E; font-weight: bold',
          'color: #2196F3; font-weight: bold',
          'color: #9E9E9E; font-weight: bold',
          'color: #FFC107; font-weight: bold'
        );
      }
    })
  );
};
