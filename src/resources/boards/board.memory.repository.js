const httpErrors = require('http-errors');
const DB = require('../../common/db/inMemoryDB');

const TABLE_NAME = 'Boards';

const getAll = async () => await DB.getAllTable(TABLE_NAME);

const getById = async id => {
  const entity = await DB.getEntityById(TABLE_NAME, id);

  if (!entity) {
    throw new httpErrors.NotFound();
  }

  return entity;
};

const create = async board => await DB.addEntity(TABLE_NAME, board);

const update = async (id, data) => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, id, data);

  if (!updatedBoard) {
    throw new httpErrors.NotFound(`Could not update board with id ${id}`);
  }

  return updatedBoard;
};

const remove = async id => {
  const board = await DB.deleteEntity(TABLE_NAME, id);

  if (!board) {
    throw new httpErrors.NotFound(`Could not remove board with id ${id}`);
  }

  return board;
};

module.exports = { getAll, getById, create, update, remove };
