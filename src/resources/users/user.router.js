const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router.post(
  '/',
  catchErrors(async (req, res) => {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });

    await res
      .status(200)
      .send(User.toResponse(await usersService.create(user)));
  })
);

router.get(
  '/',
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    await res.status(200).json(users.map(user => User.toResponse(user)));
  })
);

router.get(
  '/:id',
  catchErrors(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    await res.status(200).send(User.toResponse(user));
  })
);

router.put(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      body,
      params: { id }
    } = req;

    const updatedUser = await usersService.update(id, body);

    console.log(updatedUser);

    await res.status(200).send(User.toResponse(updatedUser));
  })
);

router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const {
      params: { id }
    } = req;
    await usersService.remove(id);
    await res.sendStatus(204);
  })
);

module.exports = router;
