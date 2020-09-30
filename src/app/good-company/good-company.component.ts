import { _ParseAST } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IPlayerData } from 'src/interfaces/IPlayerData';
import { FaceitService } from 'src/services/faceit.service';
import { GOODCOMPANYPLAYERS } from '../gc-players'

@Component({
  selector: 'app-good-company',
  templateUrl: './good-company.component.html',
  styleUrls: ['./good-company.component.css']
})
export class GoodCompanyComponent implements OnInit {

  gcPlayers = GOODCOMPANYPLAYERS;
  playerData: IPlayerData;

  constructor(
    private faceitService: FaceitService
    ) { }

  ngOnInit(): void {
  }

}
