import { Player } from "./types";

export const saveData = async (
    data: Player,
    isExist?: boolean
): Promise<void> => {
    if (isExist) {
        fetch(`rest/player/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        });
    } else {
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
    }
};
