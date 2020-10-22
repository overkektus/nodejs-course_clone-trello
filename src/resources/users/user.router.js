const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../common/middlewares/catchErrors');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      await res.status(200).json(users.map(user => User.toResponse(user)));
    })
  )
  .post(
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

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const user = await usersService.getById(req.params.id);
      await res.status(200).send(User.toResponse(user));
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const user = new User({
        id: req.params.id,
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      });

      await res
        .status(200)
        .send(User.toResponse(await usersService.update(req.params.id, user)));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      await usersService.remove(req.params.id);
      await res.sendStatus(204);
    })
  );

module.exports = router;
