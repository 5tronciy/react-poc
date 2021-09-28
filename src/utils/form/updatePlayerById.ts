import { Player } from "./types";

export const updatePlayerById = async (player: Player): Promise<void> => {
    fetch(`rest/player/${player.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(player),
    });
};
