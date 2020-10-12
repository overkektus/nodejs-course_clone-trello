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
    const board = await boardsService.getById(req.params.id);

    return res.status(200).send(board);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const board = await boardsService.create(new Board({ title, columns }));

    return res.status(200).send(board);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);

    return res.status(200).send(board);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const board = await boardsService.remove(req.params.id);

    return res.status(204).send(board);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
