/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

// Check immer to replace if possible/necessary
export const checkObj = (obj, key) => obj[key];

export const objToLowerCase = (obj) => {
    const newObj = { ...obj };

    for (const property in obj) {
        newObj[property] = obj[property].map((param) => param.toLowerCase());
    }

    return newObj;
};

export const deleteProperty = (obj, key) => {
    const { [key]: _, ...newObj } = obj;

    return newObj;
};

export const objectsEqual = (obj1, obj2) => {
    const vals1 = Object.values(obj1);
    const vals2 = Object.values(obj2);

    return vals1.every((val, index) => val === vals2[index]);
};
