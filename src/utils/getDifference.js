export const getDifference = (newObj, oldObj) => {
    if (Object.keys(oldObj).length == 0 && Object.keys(newObj).length > 0)
        return newObj;

    let diff = {};
    for (const key in oldObj) {
        if (newObj[key] && oldObj[key] != newObj[key]) {
            diff[key] = newObj[key];
        }
    }

    return diff;
};
