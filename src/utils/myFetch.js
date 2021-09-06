export const myFetch = async (endpoint, { filter, include, order }, signal) => {
    const response = await fetch(
        `rest/${endpoint}?cayenneExp=${encodeURIComponent(
            JSON.stringify(filter)
        )}${(include || []).map((i) => `&include=${i}`).join()}&sort=${order}`,
        { signal }
    );
    return response.json();
};
