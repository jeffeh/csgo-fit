import { Component, OnInit } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { FaceitService } from '../../services/faceit.service';

@Component({
  selector: 'app-simple-stat',
  templateUrl: './simple-stat.component.html',
  styleUrls: ['./simple-stat.component.css']
})
export class SimpleStatComponent implements OnInit {

  playerData: IPlayerData;
  constructor(private faceitService: FaceitService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.faceitService.getData().subscribe(data => {
      this.playerData = data;
    });
  }
}
