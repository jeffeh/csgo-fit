// To parse this data:
//
//   import { Convert, IPlayerData } from "./file";
//
//   const iPlayerData = Convert.toIPlayerData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IPlayerData {
    player_id:            string;
    nickname:             string;
    avatar:               string;
    country:              string;
    cover_image:          string;
    cover_featured_image: string;
    infractions:          Infractions;
    platforms:            Platforms;
    games:                Games;
    settings:             Settings;
    friends_ids:          string[];
    bans:                 any[];
    new_steam_id:         string;
    steam_id_64:          string;
    steam_nickname:       string;
    membership_type:      string;
    memberships:          string[];
    faceit_url:           string;
}

export interface Games {
    csgo: Csgo;
}

export interface Csgo {
    game_profile_id:   string;
    region:            string;
    regions:           Regions;
    skill_level_label: string;
    game_player_id:    string;
    skill_level:       number;
    faceit_elo:        number;
    game_player_name:  string;
}

export interface Regions {
    US: Us;
}

export interface Us {
    selected_ladder_id: string;
}

export interface Infractions {
    last_infraction_date: string;
    afk:                  number;
    leaver:               number;
    qm_not_checkedin:     number;
    qm_not_voted:         number;
}

export interface Platforms {
    steam: string;
}

export interface Settings {
    language: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIPlayerData(json: string): IPlayerData {
        return cast(JSON.parse(json), r("IPlayerData"));
    }

    public static iPlayerDataToJson(value: IPlayerData): string {
        return JSON.stringify(uncast(value, r("IPlayerData")), null, 2);
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
    "IPlayerData": o([
        { json: "player_id", js: "player_id", typ: "" },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "avatar", js: "avatar", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "cover_image", js: "cover_image", typ: "" },
        { json: "cover_featured_image", js: "cover_featured_image", typ: "" },
        { json: "infractions", js: "infractions", typ: r("Infractions") },
        { json: "platforms", js: "platforms", typ: r("Platforms") },
        { json: "games", js: "games", typ: r("Games") },
        { json: "settings", js: "settings", typ: r("Settings") },
        { json: "friends_ids", js: "friends_ids", typ: a("") },
        { json: "bans", js: "bans", typ: a("any") },
        { json: "new_steam_id", js: "new_steam_id", typ: "" },
        { json: "steam_id_64", js: "steam_id_64", typ: "" },
        { json: "steam_nickname", js: "steam_nickname", typ: "" },
        { json: "membership_type", js: "membership_type", typ: "" },
        { json: "memberships", js: "memberships", typ: a("") },
        { json: "faceit_url", js: "faceit_url", typ: "" },
    ], false),
    "Games": o([
        { json: "csgo", js: "csgo", typ: r("Csgo") },
    ], false),
    "Csgo": o([
        { json: "game_profile_id", js: "game_profile_id", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "regions", js: "regions", typ: r("Regions") },
        { json: "skill_level_label", js: "skill_level_label", typ: "" },
        { json: "game_player_id", js: "game_player_id", typ: "" },
        { json: "skill_level", js: "skill_level", typ: 0 },
        { json: "faceit_elo", js: "faceit_elo", typ: 0 },
        { json: "game_player_name", js: "game_player_name", typ: "" },
    ], false),
    "Regions": o([
        { json: "US", js: "US", typ: r("Us") },
    ], false),
    "Us": o([
        { json: "selected_ladder_id", js: "selected_ladder_id", typ: "" },
    ], false),
    "Infractions": o([
        { json: "last_infraction_date", js: "last_infraction_date", typ: "" },
        { json: "afk", js: "afk", typ: 0 },
        { json: "leaver", js: "leaver", typ: 0 },
        { json: "qm_not_checkedin", js: "qm_not_checkedin", typ: 0 },
        { json: "qm_not_voted", js: "qm_not_voted", typ: 0 },
    ], false),
    "Platforms": o([
        { json: "steam", js: "steam", typ: "" },
    ], false),
    "Settings": o([
        { json: "language", js: "language", typ: "" },
    ], false),
};
