import { myFetch, IParams } from "../myFetch";
import { Player, PlayerFetched } from "./types";

export const loadData = async (
    endpoint: string,
    params: IParams
): Promise<PlayerFetched> => {
    const resp = await myFetch<PlayerFetched>(endpoint, params);
    return resp.parsedBody.data[0];
};
