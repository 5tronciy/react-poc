export const myFetch = async (endpoint, { filter, include, order }) => {
    const response = await fetch(
        `${process.env.SERVER_REST}/${endpoint}?cayenneExp=${encodeURIComponent(
            JSON.stringify(filter)
        )}${(include || []).map((i) => "&include=" + i).join("")}&sort=${order}`
    );
    return response.json();
};
