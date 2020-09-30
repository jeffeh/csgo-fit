export interface IMatch {
    rounds: Round[];
}


export interface Round {
    best_of:        string;
    competition_id: null;
    game_id:        string;
    game_mode:      string;
    match_id:       string;
    match_round:    string;
    played:         string;
    round_stats:    RoundStats;
    teams:          Team[];
}

export interface RoundStats {
    Winner: string;
    Score:  string;
    Region: string;
    Map:    string;
    Rounds: string;
}

export interface Team {
    team_id:    string;
    premade:    boolean;
    team_stats: TeamStats;
    players:    Player[];
}

export interface Player {
    player_id:    string;
    nickname:     string;
    player_stats: PlayerStats;
}

export interface PlayerStats {
    Assists:        string;
    "Headshots %":  string;
    Kills:          string;
    "K/D Ratio":    string;
    "Penta Kills":  string;
    Deaths:         string;
    Headshot:       string;
    "Quadro Kills": string;
    "K/R Ratio":    string;
    "Triple Kills": string;
    MVPs:           string;
    Result:         string;
}

export interface TeamStats {
    "Final Score":       string;
    "Overtime score":    string;
    "First Half Score":  string;
    "Second Half Score": string;
    Team:                string;
    "Team Win":          string;
    "Team Headshot":     string;
}
