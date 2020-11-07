const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const findAll = () => boardsRepo.findAll();
const findOne = id => boardsRepo.findOne(id);
const createOne = board => boardsRepo.createOne(board);
const updateOne = board => boardsRepo.updateOne(board);
const removeOne = id => {
  const isDeleted = boardsRepo.removeOne(id);
  if (isDeleted) {
    tasksService.removeByBoardId(id);
  }
  return isDeleted;
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
