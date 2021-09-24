import { PlayerToDb, PlayerFormData } from "./types";

export const transformDataToDB = (data: PlayerFormData): PlayerToDb => {
    return {
        firstName: data.firstName,
        middleName: data.middleName || null,
        lastName: data.lastName,
        birthDate: data.birthDate || null,
        team: data.team,
        position: data.position,
        id: data.id,
        forceRefresh: data.forceRefresh,
    };
};
