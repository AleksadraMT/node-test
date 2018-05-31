const { getRandomInt, pause, } = require('../helpers/utils');
const { IN_QUEUE, IN_PROGRESS, DONE, } = require('../helpers/status');
const io = require('../server');

const Queue = (() => {
    'use strict';

    // Task delay
    const DELAY_MIN = process.env.NODE_ENV === 'production' ? 30000 : 1500;
    const DELAY_MAX = process.env.NODE_ENV === 'production' ? 90000 : 4000;

    const queue = [];

    let currentTaskIndex = null;

    return {
        createTask: createTask,
        taskExist: taskExist,
        taskStatus: taskStatus,
        taskPosition: taskPosition,
        taskETD: taskETD,
        taskResult: taskResult,
        taskList: taskList,
    };

    async function startQueue () {
        currentTaskIndex = queue.length - 1;

        while (currentTaskIndex !== null) {
            queue[currentTaskIndex].status = IN_PROGRESS;

            // set timeout on the task
            const time = await pause(getRandomInt(DELAY_MIN, DELAY_MAX));

            //update current task data
            queue[currentTaskIndex].etd = time / 100;
            queue[currentTaskIndex].status = DONE;
            queue[currentTaskIndex].result = getRandomInt();

            currentTaskIndex = checkLastInQueue(queue, currentTaskIndex);

            if (currentTaskIndex + 1 === queue.length) {
                currentTaskIndex = null;

                break;
            }

            currentTaskIndex += 1;
        }

    }

    function checkLastInQueue(queue, index) {
        return index + 1 === queue.length ? null : index + 1;
    }

    function createTask() {
        const etd = queue.length > 0 ? countETD() : (DELAY_MIN + DELAY_MAX) / 2;
        const newTask = {
            status: IN_QUEUE,
            result: null,
            etd,
        };

        queue.push(newTask);

        if (currentTaskIndex === null) startQueue();

        io.emit('statusMessage', queue.length);

        return {
            id: queue.length - 1,
            etd
        };
    }

    function countETD() {
        return queue.reduce((prev, sum) => prev + sum.etd, 0) / queue.length
    }

    function taskExist(id) {
        return id >= 0 && id < queue.length;
    }

    function taskStatus(id) {
        return queue[id].status;
    }

    function taskPosition(id) {
        return queue[id].status === IN_QUEUE ? id - currentTaskIndex : null;
    }

    function taskETD(id) {
        return queue[id].status !== DONE ? queue[id].etd : null;
    }

    function taskResult(id) {
        return queue[id].result;
    }

    function taskList() {
        return queue.map(({ etd }, id) => ({ etd, id }));
    }
})();

module.exports = Queue;
