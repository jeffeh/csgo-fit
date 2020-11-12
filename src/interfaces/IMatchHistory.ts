export interface IMatchHistory {
    items: Item[];
    start: number;
    end:   number;
    from:  number;
    to:    number;
}

export interface Item {
    match_id:         string;
    game_id:          GameID;
    region:           Region;
    match_type:       string;
    game_mode:        GameMode;
    max_players:      number;
    teams_size:       number;
    teams:            Teams;
    playing_players:  string[];
    competition_id:   string;
    competition_name: CompetitionName;
    competition_type: CompetitionType;
    organizer_id:     OrganizerID;
    status:           Status;
    started_at:       number;
    finished_at:      number;
    results:          Results;
    faceit_url:       string;
}

export enum CompetitionName {
    CSGO5V5 = "CS:GO 5v5",
}

export enum CompetitionType {
    Matchmaking = "matchmaking",
}

export enum GameID {
    Csgo = "csgo",
}

export enum GameMode {
    The5V5 = "5v5",
}

export enum OrganizerID {
    Faceit = "faceit",
}

export enum Region {
    Us = "US",
}

export interface Results {
    winner: Winner;
    score:  Score;
}

export interface Score {
    faction2: number;
    faction1: number;
}

export enum Winner {
    Faction1 = "faction1",
    Faction2 = "faction2",
}

export enum Status {
    Finished = "finished",
}

export interface Teams {
    faction1: Faction;
    faction2: Faction;
}

export interface Faction {
    team_id:  string;
    nickname: string;
    avatar:   string;
    type:     string;
    players:  Player[];
}

export interface Player {
    player_id:        string;
    nickname:         string;
    avatar:           string;
    skill_level:      number;
    game_player_id:   string;
    game_player_name: string;
    faceit_url:       string;
}

