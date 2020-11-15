import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { IMatchHistory, Item, Winner } from 'src/interfaces/IMatchHistory';
import { FaceitService } from '../../services/faceit.service';
import { FaceitLevel } from '../../data/FaceitLevel';
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

  getDifferenceLevel(currentElo: number): number {
    let diff = 0;
    const getLevels = FaceitLevel();
    for (const level of getLevels.LEVELS) {
      if (currentElo >= level[0] && currentElo <= level[1]) {
        diff = (level[1] - currentElo);
      }
    }

    return diff;
  }

  public displayEloMessage(currentElo: number, currentLevel: number): string {
    const diff = this.getDifferenceLevel(currentElo);

    if (diff !== 0) {
      return `🔼 ${diff} more ELO to reach to LEVEL ${currentLevel + 1}`;
    }
    else {
      return 'Maximum LEVEL reached 🔥';
    }
  }

  public getWinningColor(match: Item): string {
    return (match.results.winner === Winner.Faction1) ? 'text-green-600' : 'text-red-600';
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
