const Utils = (() => {
    "use strict";

    return {
        getRandomInt: getRandomInt,
        pause: pause
    };

    function getRandomInt(MIN = 10, MAX = 1000) {
        return Math.floor(Math.random() * (MAX - (MIN + 10))) + MIN;
    }

    async function pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms, ms));
    }
})();

module.exports = Utils;