const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  try {
    const {
      params: { boardId }
    } = req;

    const tasks = await tasksService.getAll(boardId);

    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(404).send('Tasks not found');
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const {
      params: { taskId }
    } = req;

    const task = await tasksService.getById(taskId);

    return res.status(200).send(task);
  } catch (error) {
    const { message } = error;
    return res.status(404).send(message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const {
      body,
      params: { boardId }
    } = req;

    const task = await tasksService.create(new Task({ ...body, boardId }));

    return res.status(200).send(task);
  } catch (error) {
    const { message } = error;
    return res.status(400).send(message);
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const {
      body,
      params: { taskId }
    } = req;

    const task = await tasksService.update(taskId, body);

    return res.status(200).send(task);
  } catch (error) {
    const { message } = error;
    return res.status(400).send(message);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    const {
      params: { taskId }
    } = req;

    await tasksService.remove(taskId);

    return res.status(204).send('OK');
  } catch (error) {
    const { message } = error;
    return res.status(404).send(message);
  }
});

module.exports = router;
