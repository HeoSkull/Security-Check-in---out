import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@enviroments/environment.development';

import { Group, GroupsPagination } from '../models/group.model';
import { ServerResponse } from '@models/http-response.model';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getGroup(id: string): Observable<Group> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/group/detail`, {
        params: {
          id,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data as Group;
        })
      );
  }

  getGroups(
    currentPage: number = 1,
    perPage: number = 5
  ): Observable<GroupsPagination> {
    return this.httpClient
      .get<ServerResponse>(
        `${this.apiUrl}/group/list?page=${currentPage}&limit=${perPage}`
      )
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          const { groups, total } = res.data;

          const groupsPagination: GroupsPagination = {
            groups,
            total,
            perPage,
            currentPage,
          };

          return groupsPagination;
        })
      );
  }

  addGroup(name: string, description: string): Observable<Group> {
    return this.httpClient
      .post<ServerResponse>(`${this.apiUrl}/group/create`, {
        name,
        description,
      })
      .pipe(
        map((res) => {
          if (res.status !== 201) {
            throw new Error(res.message);
          }

          return res.data as Group;
        })
      );
  }

  updateGroup(
    id: string,
    name: string,
    description: string
  ): Observable<Group> {
    return this.httpClient
      .put<ServerResponse>(
        `${this.apiUrl}/group/update`,
        {
          name,
          description,
        },
        {
          params: {
            id,
          },
        }
      )
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data as Group;
        })
      );
  }

  deleteGroup(id: string): Observable<void> {
    return this.httpClient
      .delete<ServerResponse>(`${this.apiUrl}/group/delete`, {
        params: {
          id,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }
        })
      );
  }
}
