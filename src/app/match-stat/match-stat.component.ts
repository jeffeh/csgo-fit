import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch, Team, Player } from 'src/interfaces/IMatch';
import { FaceitService } from 'src/services/faceit.service';

@Component({
  selector: 'app-match-stat',
  templateUrl: './match-stat.component.html',
  styleUrls: ['./match-stat.component.css']
})
export class MatchStatComponent implements OnInit {

  match: IMatch;

  constructor(
    private faceitService: FaceitService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('matchId');
    this.faceitService.getMatchById(matchId).subscribe(data => {
      this.match = data;
    });
  }

  public getWinningColor(team: Team): string {
    return (team.team_stats["Team Win"] === '1' ? 'text-green-600' : 'text-red-600');
  }
}
