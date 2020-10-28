const router = require('express').Router();
const boardsService = require('./board.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router.post(
  '/',
  catchErrors(async (req, res) => {
    const { body } = req;
    const board = await boardsService.create(body);
    await res.status(200).send(board);
  })
);

router.get(
  '/',
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    await res.status(200).json(boards);
  })
);

router.get(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id }
    } = req;
    const board = await boardsService.getById(id);
    if (board) {
      await res.status(200).send(board);
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

    const updatedBoard = await boardsService.update(id, body);

    if (!updatedBoard) {
      return res.sendStatus(404);
    }

    return res.status(200).send(updatedBoard);
  })
);

router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id }
    } = req;

    const isDeleted = await boardsService.remove(id);

    if (!isDeleted) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  })
);

module.exports = router;
