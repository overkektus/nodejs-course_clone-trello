// const httpErrors = require('http-errors');
const Task = require('./tasks.model');

const getAll = async () => {
  return Task.find({});
};

const getById = async id => {
  return Task.findById(id);
  // const entity = await DB.getEntityById(TABLE_NAME, id);

  // if (!entity) {
  //   throw new httpErrors.NotFound(`The task with id ${id} was not found`);
  // }

  // return entity;
};

const create = async task => {
  return Task.create(task);
};

const update = async (id, data) => {
  await Task.updateOne({ _id: id }, data);
  return Task.findById(id);
};

const remove = async id => {
  // const task = await DB.deleteEntity(TABLE_NAME, id);
  // if (!task) {
  //   throw new httpErrors.NotFound(`Could not remove task with id ${id}`);
  // }
  // return task;
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

const removeByBoardId = async id => {
  return Task.deleteMany({ boardId: id });
};

const resetUserId = async id => {
  return Task.updateMany({ userId: id }, { $set: { userId: null } });
};
// await DB.deleteAll(TABLE_NAME, { boardId });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeByBoardId,
  resetUserId
};
