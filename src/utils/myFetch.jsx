export const myFetch = async (
    endpoint,
    { filter, include, order },
    cancelToken
) => {
    const response = await fetch(
        `${process.env.SERVER_REST}/${endpoint}?cayenneExp=${encodeURIComponent(
            JSON.stringify(filter)
        )}${(include || [])
            .map((i) => "&include=" + i)
            .join("")}&sort=${order}`,
        { cancelToken }
    );
    return response.json();
};
