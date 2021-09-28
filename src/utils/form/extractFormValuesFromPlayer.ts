import { PlayerFetched, PlayerFormData } from "./types";

export const extractFormValuesFromPlayer = (
    data: PlayerFetched
): PlayerFormData => {
    return {
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        birthDate: data.birthDate || "",
        team: data.team.id,
        position: data.position,
        id: data.id,
        forceRefresh: data.forceRefresh || false,
    };
};
