const dynamicJoin = (fn) => {
  return (array) => {
    let result = array[0].title;
    for (let i = 1; i < array.length; i++) {
      const joiner = fn(array[i - 1]);
      result += joiner + array[i].title;
    }
    return result;
  };
};

const joinDynamically = dynamicJoin((song) => {
  return (song.transition) ? ' > ' : ', ';
});

module.exports = joinDynamically;
