import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { IMatchHistory, Item, Winner } from 'src/interfaces/IMatchHistory';
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
  gcPlayerName = null;
  greenText = 'text-green-600';
  redText = 'text-red-600';

  constructor(
    private faceitService: FaceitService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gcPlayerName = this.route.snapshot.paramMap.get('playerName');
    if (this.gcPlayerName) {
      this.getData(this.gcPlayerName);
    }
  }

  ngOnChanges(): void {
    this.getData(this.username);
  }

  public getWinningColor(match: Item): string {
    var desiredPlayerName = this.gcPlayerName; // cannot pass this.gcPlayerName in .find(). use var instead
    if (match.results.winner === "faction1") {
      var playerFound = match.teams.faction1.players.find(p => p.nickname === desiredPlayerName)
      return playerFound ? this.greenText : this.redText;
    } else { // faction2 was the winner
      var playerFound = match.teams.faction2.players.find(p => p.nickname === desiredPlayerName)
      return playerFound ? this.greenText : this.redText;
    }
  }

  public getWinningTeam(match: Item): string {
    return (match.results.winner === Winner.Faction1) ? match.teams.faction1.nickname : match.teams.faction2.nickname;
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
