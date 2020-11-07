const tasksRepo = require('./task.db.repository');

const findAll = boardId => tasksRepo.findAll(boardId);
const findOne = taskId => tasksRepo.findOne(taskId);
const createOne = task => tasksRepo.createOne(task);
const updateOne = task => tasksRepo.updateOne(task);
const removeOne = (boardId, taskId) => tasksRepo.removeOne(boardId, taskId);
const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);
const resetUserId = id => tasksRepo.resetUserId(id);

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne,
  removeByBoardId,
  resetUserId
};
