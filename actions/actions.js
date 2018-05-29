const queueService = require('../services/queueService');

module.exports.createTask = (req, res) => res.json(queueService.createTask());
module.exports.checkTask = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        res.status(400).json({ message: 'Bad id parameter' });
        return;
    }

    if (!queueService.taskExist(id)) {
        res.status(400).json({ message: 'Task not found' });
        return;
    }

    const status = queueService.taskStatus(id);
    const position = queueService.taskPostion(id);
    const etd = queueService.taskETD(id);
    const result = queueService.taskResult(id);

    const response = {
        status,
    };

    if (position) response.position = position;
    if (etd) response.etd = etd;
    if (result) response.result = result;

    res.json(response);
};
module.exports.getList = (req, res) => res.json(queueService.taskList());