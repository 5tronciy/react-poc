export enum Position {
    "C" = "center",
    "G" = "goalie",
    "D" = "defense",
    "R" = "right wing",
    "L" = "left wing",
}

export interface Player {
    id: number;
    birthDate: string | null;
    firstName: string;
    middleName: string | null;
    lastName: string;
    position: Position;
    forceRefresh: boolean;
}

export interface PlayerFetched extends Player {
    team: Team;
}

export interface PlayerSerialized extends Player {
    team: number;
}

export interface Team {
    id: number;
    abbrev: string;
    active: boolean;
    commonName: string;
    forceRefresh: boolean;
    fullName: string;
    generalManager: string;
    location: string;
}

export interface PlayerFormData extends Player {
    team: number;
}
