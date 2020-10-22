const httpErrors = require('http-errors');
const DB = require('../../common/db/inMemoryDB');

const TABLE_NAME = 'Tasks';

const getAll = async () => await DB.getAllTable(TABLE_NAME);

const getById = async id => {
  const entity = await DB.getEntityById(TABLE_NAME, id);

  if (!entity) {
    throw new httpErrors.NotFound(`The task with id ${id} was not found`);
  }

  return entity;
};

const create = async task => await DB.addEntity(TABLE_NAME, task);

const update = async (id, data) => {
  const updatedTask = await DB.updateEntity(TABLE_NAME, id, data);

  if (!updatedTask) {
    throw new httpErrors.NotFound(`Could not update task with id ${id}`);
  }

  return updatedTask;
};

const remove = async id => {
  const task = await DB.deleteEntity(TABLE_NAME, id);

  if (!task) {
    throw new httpErrors.NotFound(`Could not remove task with id ${id}`);
  }

  return task;
};

const removeByBoardId = async boardId =>
  await DB.deleteAll(TABLE_NAME, { boardId });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeByBoardId
};
