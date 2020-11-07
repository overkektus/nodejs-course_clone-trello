const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.findAll(req.params.boardId);
      res.status(200).send(tasks);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = new Task({ ...req.body, boardId: req.params.boardId });
      await tasksService.createOne(task);
      res.status(200).send(task);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.findOne(req.params.taskId);
      if (task) {
        res.status(200).send(task);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const task = {
        ...req.body,
        id: req.params.taskId,
        boardId: req.params.boardId
      };
      const isUpdated = await tasksService.updateOne(task);
      if (isUpdated) {
        res.status(200).send(task);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const task = await tasksService.removeOne(
        req.params.boardId,
        req.params.taskId
      );
      if (task) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
