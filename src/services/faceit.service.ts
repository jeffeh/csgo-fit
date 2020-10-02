import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IPlayerData } from '../interfaces/IPlayerData';
import { IMatchHistory } from '../interfaces/IMatchHistory';
import { IMatch} from '../interfaces/IMatch';

@Injectable({
  providedIn: 'root'
})
export class FaceitService {

  clientOptions = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer f14b614b-d1c8-4bed-92ed-3c7de3d37f22'
    }
  };

  constructor(private httpClient: HttpClient) { }

  getData(user: string): Observable<IPlayerData> {
    return this.httpClient.get<IPlayerData>(`https://open.faceit.com/data/v4/players?nickname=${user}`, this.clientOptions).pipe(
      catchError((err: HttpErrorResponse) => {
          return throwError(err.message || 'server error')
        }
      )
    );
  }

  getDataById(player_id: string): Observable<IPlayerData> {
    return this.httpClient.get<IPlayerData>(`https://open.faceit.com/data/v4/players/${player_id}`, this.clientOptions);
  }


  getMatchHistory(userId: string): Observable<IMatchHistory> {
    return this.httpClient.get<IMatchHistory>(`https://open.faceit.com/data/v4/players/${userId}/history?game=csgo&offset=0&limit=20`, this.clientOptions);
  }

  getMatchById(matchId: string): Observable<IMatch> {
    return this.httpClient.get<IMatch>(`https://open.faceit.com/data/v4/matches/${matchId}/stats`, this.clientOptions);
  }
}
