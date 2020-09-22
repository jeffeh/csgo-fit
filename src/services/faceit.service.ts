import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IPlayerData } from '../interfaces/IPlayerData';

@Injectable({
  providedIn: 'root'
})
export class FaceitService {

  constructor(private httpClient: HttpClient) { }

  getData(user: string): Observable<IPlayerData> {
    return this.httpClient.get<IPlayerData>(`https://open.faceit.com/data/v4/players?nickname=${user}`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer f14b614b-d1c8-4bed-92ed-3c7de3d37f22'
      }
    });
  }
}
