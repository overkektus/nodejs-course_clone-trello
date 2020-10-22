const httpErrors = require('http-errors');
const DB = require('../../common/db/inMemoryDB');

const TABLE_NAME = 'Users';

const getAll = async () => await DB.getAllTable(TABLE_NAME);

const getById = async id => {
  const entity = await DB.getEntityById(TABLE_NAME, id);

  if (!entity) {
    throw new httpErrors.NotFound(`The user with id ${id} was not found`);
  }

  return entity;
};

const create = async user => await DB.addEntity(TABLE_NAME, user);

const update = async (id, data) => {
  const updatedUser = await DB.updateEntity(TABLE_NAME, id, data);

  if (!updatedUser) {
    throw new httpErrors.NotFound(`The user with id ${id} was not found`);
  }

  return updatedUser;
};

const remove = async id => {
  if (!(await DB.deleteEntity(TABLE_NAME, id))) {
    throw new httpErrors.NotFound(`Could not remove user with id ${id}`);
  }
};

module.exports = { getAll, getById, create, update, remove };
