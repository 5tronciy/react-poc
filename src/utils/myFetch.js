export const myFetch = async (endpoint, { filter, include, order }, signal) => {
    const response = await fetch(
        `rest/${endpoint}?cayenneExp=${
            filter !== undefined
                ? encodeURIComponent(JSON.stringify(filter))
                : ""
        }${(include || []).map((i) => `&include=${i}`).join()}&sort=${
            order !== undefined ? order : ""
        }`,
        { signal }
    );
    return response.json();
};
