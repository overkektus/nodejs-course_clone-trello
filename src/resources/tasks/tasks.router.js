const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router.post(
  '/',
  catchErrors(async (req, res) => {
    const {
      body,
      params: { boardId }
    } = req;

    const task = await tasksService.create({ ...body, boardId });

    return res.status(200).send(task);
  })
);

router.get(
  '/',
  catchErrors(async (req, res) => {
    const tasks = await tasksService.getAll();
    await res.status(200).json(tasks);
  })
);

router.get(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id }
    } = req;

    const task = await tasksService.getById(id);

    if (task) {
      await res.status(200).send(task);
    } else {
      await res.sendStatus(404);
    }
  })
);

router.put(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id },
      body
    } = req;

    const updatedTask = await tasksService.update(id, body);

    return res.status(200).send(updatedTask);
  })
);

router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id }
    } = req;

    await tasksService.remove(id);
    return res.sendStatus(204);
  })
);

module.exports = router;
