import { Player } from "./types";

export const createPlayer = async (data: Player): Promise<void> => {
    const response = await fetch("rest/player?sort=id&dir=DESC&limit=1");
    const lastPlayer = await response.json();
    const maxId: number = lastPlayer.data[0].id;
    fetch("rest/player", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            ...Object.entries(data).reduce(
                (acc, [key, value]) =>
                    value !== "" ? { ...acc, [key]: value } : acc,
                {}
            ),
            id: maxId + 1,
        }),
    });
};
