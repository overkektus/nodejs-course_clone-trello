const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();
      await res.status(200).json(boards);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const board = new Board({
        title: req.body.title,
        columns: [...req.body.columns]
      });

      await res.status(200).send(await boardsService.create(board));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const board = await boardsService.getById(req.params.id);
      if (board) {
        await res.status(200).send(board);
      } else {
        await res.sendStatus(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const board = new Board({
        id: req.params.id,
        title: req.body.title,
        columns: [...req.body.columns]
      });

      await res
        .status(200)
        .send(await boardsService.update(req.params.id, board));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      await boardsService.remove(req.params.id);
      res.sendStatus(204);
    })
  );

module.exports = router;
