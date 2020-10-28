const userRepository = require('./user.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => userRepository.getAll();

const getById = id => userRepository.getById(id);

const create = user => userRepository.create(user);

const update = (id, user) => userRepository.update(id, user);

const remove = async id => {
  const isUserDelete = !!userRepository.remove(id);
  if (isUserDelete) {
    tasksService.resetUserId(id);
  }
};

module.exports = { getAll, getById, create, update, remove };
