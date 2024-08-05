import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient) {}

  getTest() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }
}
