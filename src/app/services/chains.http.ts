import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChainDto } from '../interfaces/chain.interface';

@Injectable({
  providedIn: 'root',
})
export class ChainsHttp {
  constructor(private readonly httpClient: HttpClient) {}

  get(): Observable<ChainDto[]> {
    return this.httpClient.get<ChainDto[]>('/chains');
  }
}
