const Task = require('./task.model');

const findAll = async boardId => {
  return Task.find({ boardId });
};
const findOne = async id => {
  return Task.findById(id);
};
const createOne = async task => {
  return Task.create(task);
};
const updateOne = async task => {
  return Task.findByIdAndUpdate(task.id, task);
};
const removeOne = async (boardId, id) => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};
const removeByBoardId = async id => {
  return Task.deleteMany({ boardId: id });
};
const resetUserId = async id => {
  return Task.updateMany({ userId: id }, { $set: { userId: null } });
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne,
  removeByBoardId,
  resetUserId
};
