const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await tasksService.getAll();
      await res.status(200).json(tasks);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const task = new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      });

      await res.status(200).send(await tasksService.create(task));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const task = await tasksService.getById(req.params.id);
      if (task) {
        await res.status(200).send(task);
      } else {
        await res.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const task = new Task({
        id: req.params.id,
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.body.boardId,
        columnId: req.body.columnId
      });

      await res
        .status(200)
        .send(await tasksService.update(req.params.id, task));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      await tasksService.remove(req.params.id);
      await res.sendStatus(204);
    })
  );

module.exports = router;
