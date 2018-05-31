const Utils = (() => {
    "use strict";

    return {
        getRandomInt: getRandomInt,
        pause: pause
    };

    function getRandomInt(MIN = 10, MAX = 1000) {
        return Math.round(Math.random() * (MAX - (MIN + 10))) + MIN;
    }

    async function pause(time) {
        return new Promise(resolve => setTimeout(resolve, time, time));
    }
})();

module.exports = Utils;