type Filter = {
    exp: string;
    params: { [key: string]: string };
};

type Data<T> = {
    data: T[];
    success: boolean;
    total: number;
};

export interface IParams {
    filter?: Filter | string | string[];
    include?: string[];
    order?: string;
}

export const myFetch = async <T>(
    endpoint: string,
    { filter, include, order }: IParams,
    signal?: AbortSignal
): Promise<{ response: Response; parsedBody: Data<T> }> => {
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
