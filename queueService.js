const { getRandomInt, sleep, log } = require('./helpers');

// Task delay
const DELAY_MIN = process.env.NODE_ENV === 'production' ? 30000 : 1000;
const DELAY_MAX = process.env.NODE_ENV === 'production' ? 90000 : 3000;

// Task statuses
const STATUS_QUEUE = 'in queue';
const STATUS_PROGRESS = 'in progress';
const STATUS_DONE = 'done';

const queue = [];

let currentTaskIndex = null;

const startQueue = async () => {
    currentTaskIndex = queue.length - 1;

    log('[DEBUG] Queue started');
    do {
        log('[DEBUG] Task started, id:', currentTaskIndex);

        queue[currentTaskIndex].status = STATUS_PROGRESS;

        // eslint-disable-next-line no-await-in-loop
        const time = await sleep(getRandomInt(DELAY_MIN, DELAY_MAX));

        queue[currentTaskIndex].etd = time / 1000;
        queue[currentTaskIndex].status = STATUS_DONE;
        queue[currentTaskIndex].result = getRandomInt(1, 100);

        log(
            '[DEBUG] Task finished,',
            'id:', currentTaskIndex,
            'time:', time / 1000,
            'result:', queue[currentTaskIndex].result,
        );

        if (currentTaskIndex + 1 === queue.length) {
            currentTaskIndex = null;
            break;
        }

        currentTaskIndex += 1;
    } while (currentTaskIndex !== null);
    log('[DEBUG] Queue finished');
};

const taskExist = id => id >= 0 && id < queue.length;

const createTask = () => {
    const etd = queue.length > 0
        ? queue.reduce((prev, curr) => prev + curr.etd, 0) / queue.length
: (DELAY_MIN + DELAY_MAX) / 2;

    const newTask = {
        status: STATUS_QUEUE,
        result: null,
        etd,
    };

    log('[DEBUG] Task added, id:', queue.length);
    queue.push(newTask);

    if (currentTaskIndex === null) startQueue();

    return { id: queue.length - 1, etd };
};

const taskStatus = id => queue[id].status;

const taskPostion = id =>
(queue[id].status === STATUS_QUEUE ? id - currentTaskIndex : null);

const taskETD = id =>
(queue[id].status !== STATUS_DONE ? queue[id].etd : null);

const taskResult = id => queue[id].result;

const taskList = () => queue.map(({ etd }, id) => ({ etd, id }));

module.exports = {
    createTask,
    taskExist,
    taskStatus,
    taskPostion,
    taskETD,
    taskResult,
    taskList,
};
