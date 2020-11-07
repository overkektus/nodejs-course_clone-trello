const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.findAll();
      res.status(200).send(boards);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const board = new Board(req.body);
      await boardsService.createOne(board);
      res.status(200).send(board);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.findOne(req.params.id);
      if (board) {
        res.status(200).send(board);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const board = {
        id: req.params.id,
        ...req.body
      };
      const updateBoard = await boardsService.updateOne(board);
      if (updateBoard) {
        res.status(200).send(board);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const board = await boardsService.removeOne(req.params.id);
      if (board) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
