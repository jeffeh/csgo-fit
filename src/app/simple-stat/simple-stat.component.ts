import { Component, Input, OnChanges } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { IMatchHistory } from 'src/interfaces/IMatchHistory';
import { FaceitService } from '../../services/faceit.service';

@Component({
  selector: 'app-simple-stat',
  templateUrl: './simple-stat.component.html',
  styleUrls: ['./simple-stat.component.css']
})
export class SimpleStatComponent implements OnChanges {

  @Input() username: string;
  playerData: IPlayerData;
  matchHistory: IMatchHistory;

  constructor(private faceitService: FaceitService) { }

  ngOnChanges(): void {
    this.getData(this.username);
  }

  private getData(username: string): void {
    this.getPlayerData(username);
  }

  private getPlayerData(username: string): void {
    this.faceitService.getData(username).subscribe(data => {
      this.playerData = data;
      this.getMatchHistory(this.playerData.player_id);
    });
  }

  private getMatchHistory(userId: string): void {
    this.faceitService.getMatchHistory(userId).subscribe(data => {
      this.matchHistory = data;
    });
  }
}
