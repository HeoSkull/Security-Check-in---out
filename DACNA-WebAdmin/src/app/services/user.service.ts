import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, of, throwError } from 'rxjs';

import { environment } from '@enviroments/environment.development';
import {
  LoginModel,
  RegisterModel,
  UpdateUser,
  User,
} from '../models/user.model';

import { ServerResponse } from 'src/app/models/http-response.model';

const dummyUserDatas = [
  {
    id: '1',
    email: 'johndoe@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    photoUrl: '',
  },
  {
    id: '2',
    email: 'goldenfealla@gmail.com',
    firstName: 'Golden',
    lastName: 'Fealla',
    photoUrl: '',
  },
  {
    id: '3',
    email: 'anteemo@gmail.com',
    firstName: 'An',
    lastName: 'Teemo',
    photoUrl: '',
  },
  {
    id: '4',
    email: 'heoskull@gmail.com',
    firstName: 'Heo',
    lastName: 'Skull',
    photoUrl: '',
  },
  {
    id: '5',
    email: 'phatnucnuc@gmail.com',
    firstName: 'Phat',
    lastName: 'NucNuc',
    photoUrl: '',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  loginUser(user: LoginModel): Observable<ServerResponse> {
    const body = {
      username: user.username,
      password: user.password,
    };

    return this.httpClient
      .post<ServerResponse>(`${this.apiUrl}/user/login`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  registerUser(user: RegisterModel): Observable<ServerResponse> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      last_name: user.lastName,
      first_name: user.firstName,
      phone: user.phoneNumber,
    };

    return this.httpClient
      .post<ServerResponse>(`${this.apiUrl}/user/register`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  getUserByIDTest(id: string): Observable<ServerResponse> {
    const user = dummyUserDatas.find((user) => user.id === id);

    const response: ServerResponse = {
      status: 200,
      message: 'User found',
      error: null,
      data: user,
    };

    return of(response);
  }

  getUserData(): Observable<ServerResponse> {
    return this.httpClient
      .get<ServerResponse>(`${this.apiUrl}/user`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  updateUserData(data: UpdateUser): Observable<ServerResponse> {
    const body = {
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    };

    return this.httpClient
      .put<ServerResponse>(`${this.apiUrl}/user/update`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  searchUser(
    query: string,
    groupID: string,
    excludedID: string[]
  ): Observable<ServerResponse<User[]>> {
    return this.httpClient
      .get<ServerResponse>(
        `${
          this.apiUrl
        }/user/search?group_id=${groupID}&k=${query}&e=${excludedID.join(
          '&e='
        )}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  logoutUser(): Observable<ServerResponse> {
    return this.httpClient
      .put<ServerResponse>(`${this.apiUrl}/user/logout`, {})
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }
}
