import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/interfaces/IMatch';
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

}
