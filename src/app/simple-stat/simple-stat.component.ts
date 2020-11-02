import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { IMatchHistory, Item } from 'src/interfaces/IMatchHistory';
import { FaceitService } from '../../services/faceit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simple-stat',
  templateUrl: './simple-stat.component.html',
  styleUrls: ['./simple-stat.component.css']
})
export class SimpleStatComponent implements OnInit, OnChanges {

  @Input() username: string;
  playerData: IPlayerData;
  matchHistory: IMatchHistory;

  constructor(
    private faceitService: FaceitService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const gcPlayerName = this.route.snapshot.paramMap.get('playerName');
    if (gcPlayerName) {
      this.getData(gcPlayerName);
    }
  }

  ngOnChanges(): void {
    this.getData(this.username);
  }

  public getWinningTeam(match: Item): string {
    
  }

  public getData(username: string): void {
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
