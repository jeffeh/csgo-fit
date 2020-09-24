import { Component, OnInit } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { IMatchHistory } from 'src/interfaces/IMatchHistory';
import { FaceitService } from '../../services/faceit.service';

@Component({
  selector: 'app-simple-stat',
  templateUrl: './simple-stat.component.html',
  styleUrls: ['./simple-stat.component.css']
})
export class SimpleStatComponent implements OnInit {

  playerData: IPlayerData;
  matchHistory: IMatchHistory;

  constructor(private faceitService: FaceitService) { }

  ngOnInit(): void {
  }

  getData(username: string): void {
    console.log(username);
    this.faceitService.getData(username).subscribe(data => {
      this.playerData = data;
      this.getMatchHistory(this.playerData.player_id);
    });
  }

  getMatchHistory(userId: string): void {
    this.faceitService.getMatchHistory(userId).subscribe(data => {
      this.matchHistory = data;
    });
  }
}
