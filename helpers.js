module.exports.getRandomInt = (min, max) =>
Math.floor(Math.random() * (max - (min + 1))) + min;

module.exports.sleep = async ms =>
new Promise(res => setTimeout(res, ms, ms));

module.exports.log = (...args) =>
process.env.NODE_ENV !== 'production' && console.log(...args);
