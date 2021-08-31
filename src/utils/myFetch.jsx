export const myFetch = (endpoint, { filter, include, order }) => {
  return fetch(
    `${process.env.SERVER_REST}/${endpoint}?cayenneExp=${encodeURIComponent(
      JSON.stringify(filter)
    )}${(include || []).map((i) => "&include=" + i).join("")}&sort=${order}`
  );
};
