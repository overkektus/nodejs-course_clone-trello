const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await usersService.getById(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { body } = req;
    const user = await usersService.create(new User({ ...body }));
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req;
    const user = await usersService.update(id, body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await usersService.remove(id);

    return res.status(204).send(user);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
