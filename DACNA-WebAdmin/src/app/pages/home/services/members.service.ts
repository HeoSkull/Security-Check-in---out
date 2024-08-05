import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@enviroments/environment.development';

import {
  GroupMember,
  GroupMembersPagination,
} from '@pages/home/models/member.model';
import { ServerResponse } from '@models/http-response.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getMembers(
    group_id: string,
    currentPage: number = 1,
    perPage: number = 5
  ): Observable<GroupMembersPagination> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/group/list-members`, {
        params: {
          group_id,
          page: currentPage.toString(),
          limit: perPage.toString(),
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          const { members, total } = res.data;

          const groupMembersPagination: GroupMembersPagination = {
            members,
            total,
            perPage,
            currentPage,
          };

          return groupMembersPagination;
        })
      );
  }

  getMember(group_id: string, member_id: string): Observable<GroupMember> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/group/member`, {
        params: {
          group_id,
          member_id,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data;
        })
      );
  }

  getCurrentMember(group_id: string): Observable<GroupMember> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/group/current-member`, {
        params: {
          group_id,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return res.data;
        })
      );
  }

  addMembers(group_id: string, users_id: string[]) {
    return this.httpClient
      .post<ServerResponse>(`${this.apiUrl}/group/add-members`, {
        group_id,
        member_ids: users_id,
      })
      .pipe(
        map((res) => {
          if (res.status !== 201) {
            throw new Error(res.message);
          }

          return group_id;
        })
      );
  }

  deleteMember(group_id: string, member_id: string) {
    return this.httpClient
      .delete<ServerResponse>(`${this.apiUrl}/group/delete-member`, {
        params: {
          group_id,
          member_id,
        },
      })
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throw new Error(res.message);
          }

          return group_id;
        })
      );
  }
}
