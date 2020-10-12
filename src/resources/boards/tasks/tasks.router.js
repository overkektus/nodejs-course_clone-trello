const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(404).send('Tasks not found');
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getById(req.params.taskId);
    return res.status(200).send(task);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, description, order, userId, columnId } = req.body;

    const task = await tasksService.create(
      new Task({ title, description, order, userId, columnId, boardId })
    );

    return res.status(200).send(task);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const { taskId } = req.params;
    await tasksService.remove(taskId);
    res.status(204).send('OK');
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
