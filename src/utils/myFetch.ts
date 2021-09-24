export interface IParams {
    filter?: string;
    include?: string[];
    order?: string;
}

export const myFetch = async <T>(
    endpoint: string,
    { filter, include, order }: IParams,
    signal?: AbortSignal
): Promise<{ response: Response; parsedBody: T }> => {
    const blocks: string[] = [];
    if (filter) {
        blocks.push(`cayenneExp=${encodeURIComponent(JSON.stringify(filter))}`);
    }
    if (include) {
        include.map((i) => blocks.push(`include=${i}`));
    }
    if (order) {
        blocks.push(`sort=${order}`);
    }
    const query = blocks.join("&");
    const response = await fetch(`rest/${endpoint}?${query}`, {
        signal,
    });
    return { response, parsedBody: await response.json() };
};
