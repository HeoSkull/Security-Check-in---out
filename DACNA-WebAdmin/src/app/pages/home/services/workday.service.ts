import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@enviroments/environment.development';

import { ServerResponse } from '@models/http-response.model';
import { WorkdayHistory, WorkdayStatisticial } from '../models/workday.model';

@Injectable({
  providedIn: 'root',
})
export class WorkdayService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getWorkdayHistoryByDays(
    group_id: string,
    user_id: string,
    days: string
  ): Observable<WorkdayHistory[]> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/workday/by-date`, {
        params: {
          group_id,
          user_id,
          days,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data as WorkdayHistory[];
        })
      );
  }

  getWorkdayHistoryByStartAndEnd(
    group_id: string,
    user_id: string,
    start?: string,
    end?: string
  ): Observable<WorkdayStatisticial[]> {
    const params: any = {
      group_id,
      user_id,
    };

    if (start) {
      params['begin_date'] = start;
    }

    if (end) {
      params['end_date'] = end;
    }

    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/workday/statistical`, {
        params: params,
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data as WorkdayStatisticial[];
        })
      );
  }
}
