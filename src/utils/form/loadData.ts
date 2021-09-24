import { myFetch, IParams } from "../myFetch";
import { Player } from "./types";

export const loadData = async (
    endpoint: string,
    params: IParams
): Promise<Player> => {
    const resp = await myFetch<{ data: Player[] }>(endpoint, params);
    return resp.parsedBody.data[0];
};
