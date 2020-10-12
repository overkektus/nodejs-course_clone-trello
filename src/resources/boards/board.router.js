const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();

    return res.status(200).send(boards);
  } catch (error) {
    return res.status(404).send('Boards not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const {
      params: { id }
    } = req;

    const board = await boardsService.getById(id);

    return res.status(200).send(board);
  } catch (error) {
    const { message } = error;
    return res.status(404).send(message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { body } = req;

    const board = await boardsService.create(new Board({ ...body }));

    return res.status(200).send(board);
  } catch (error) {
    const { message } = error;
    return res.status(400).send(message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;

    const board = await boardsService.update(id, body);

    return res.status(200).send(board);
  } catch (error) {
    const { message } = error;
    return res.status(400).send(message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {
      params: { id }
    } = req;

    const board = await boardsService.remove(id);

    return res.status(204).send(board);
  } catch (error) {
    const { message } = error;
    return res.status(404).send(message);
  }
});

module.exports = router;
