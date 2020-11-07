const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const findAll = () => usersRepo.findAll();
const findOne = id => usersRepo.findOne(id);
const createOne = user => usersRepo.createOne(user);
const updateOne = user => usersRepo.updateOne(user);
const removeOne = id => {
  const isUserDeleted = usersRepo.removeOne(id);
  return isUserDeleted && tasksService.resetUserId(id);
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
