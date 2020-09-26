// To parse this data:
//
//   import { Convert, IMatchHistory } from "./file";
//
//   const iMatchHistory = Convert.toIMatchHistory(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

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

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIMatchHistory(json: string): IMatchHistory {
        return cast(JSON.parse(json), r("IMatchHistory"));
    }

    public static iMatchHistoryToJson(value: IMatchHistory): string {
        return JSON.stringify(uncast(value, r("IMatchHistory")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "IMatchHistory": o([
        { json: "items", js: "items", typ: a(r("Item")) },
        { json: "start", js: "start", typ: 0 },
        { json: "end", js: "end", typ: 0 },
        { json: "from", js: "from", typ: 0 },
        { json: "to", js: "to", typ: 0 },
    ], false),
    "Item": o([
        { json: "match_id", js: "match_id", typ: "" },
        { json: "game_id", js: "game_id", typ: r("GameID") },
        { json: "region", js: "region", typ: r("Region") },
        { json: "match_type", js: "match_type", typ: "" },
        { json: "game_mode", js: "game_mode", typ: r("GameMode") },
        { json: "max_players", js: "max_players", typ: 0 },
        { json: "teams_size", js: "teams_size", typ: 0 },
        { json: "teams", js: "teams", typ: r("Teams") },
        { json: "playing_players", js: "playing_players", typ: a("") },
        { json: "competition_id", js: "competition_id", typ: "" },
        { json: "competition_name", js: "competition_name", typ: r("CompetitionName") },
        { json: "competition_type", js: "competition_type", typ: r("CompetitionType") },
        { json: "organizer_id", js: "organizer_id", typ: r("OrganizerID") },
        { json: "status", js: "status", typ: r("Status") },
        { json: "started_at", js: "started_at", typ: 0 },
        { json: "finished_at", js: "finished_at", typ: 0 },
        { json: "results", js: "results", typ: r("Results") },
        { json: "faceit_url", js: "faceit_url", typ: "" },
    ], false),
    "Results": o([
        { json: "winner", js: "winner", typ: r("Winner") },
        { json: "score", js: "score", typ: r("Score") },
    ], false),
    "Score": o([
        { json: "faction2", js: "faction2", typ: 0 },
        { json: "faction1", js: "faction1", typ: 0 },
    ], false),
    "Teams": o([
        { json: "faction1", js: "faction1", typ: r("Faction") },
        { json: "faction2", js: "faction2", typ: r("Faction") },
    ], false),
    "Faction": o([
        { json: "team_id", js: "team_id", typ: "" },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "avatar", js: "avatar", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "players", js: "players", typ: a(r("Player")) },
    ], false),
    "Player": o([
        { json: "player_id", js: "player_id", typ: "" },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "avatar", js: "avatar", typ: "" },
        { json: "skill_level", js: "skill_level", typ: 0 },
        { json: "game_player_id", js: "game_player_id", typ: "" },
        { json: "game_player_name", js: "game_player_name", typ: "" },
        { json: "faceit_url", js: "faceit_url", typ: "" },
    ], false),
    "CompetitionName": [
        "CS:GO 5v5",
    ],
    "CompetitionType": [
        "matchmaking",
    ],
    "GameID": [
        "csgo",
    ],
    "GameMode": [
        "5v5",
    ],
    "OrganizerID": [
        "faceit",
    ],
    "Region": [
        "US",
    ],
    "Winner": [
        "faction1",
        "faction2",
    ],
    "Status": [
        "finished",
    ],
};
