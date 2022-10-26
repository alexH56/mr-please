/* eslint-disable array-callback-return */
export const flatten = (arr) =>
    arr.reduce(
        (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
        []
    )

export const removeItem = (arr, target) => {
    const indexToRemove = arr.indexOf(target)

    const newArr = [
        ...arr.slice(0, indexToRemove),
        ...arr.slice(indexToRemove + 1),
    ]

    return newArr
}
