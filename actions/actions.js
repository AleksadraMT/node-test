const {
    createTask,
    taskExist,
    taskStatus,
    taskPosition,
    taskETD,
    taskResult,
    taskList,
} = require('../services/queueService');

module.exports.createTask = (req, res) => res.json(createTask());

module.exports.checkTask = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({ message: 'Invalid id' });

        return;
    }

    if (!taskExist(id)) {
        res.status(400).json({ message: 'Task not found' });

        return;
    }

    const status = taskStatus(id);
    const position = taskPosition(id);
    const etd = taskETD(id);
    const result = taskResult(id);
    const response = {
        status,
    };

    if (position) response.position = position;
    if (etd) response.etd = etd;
    if (result) response.result = result;

    res.json(response);
};

module.exports.getList = (req, res) => res.status(200).json(taskList());