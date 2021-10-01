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
    position: string;
    forceRefresh: boolean;
}

export interface PlayerFetched extends Player {
    team: Team;
}

export interface PlayerSerialized extends Player {
    team: number;
}

export type Team = {
    id: number;
    abbrev: string;
    active: boolean;
    commonName: string;
    forceRefresh: boolean;
    fullName: string;
    generalManager: string;
    location: string;
};

export type PlayerFormData = {
    team: string;
    id: string;
    birthDate: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    forceRefresh: boolean;
};
