// const httpErrors = require('http-errors');
const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
  // const entity = await DB.getEntityById(TABLE_NAME, id);

  // if (!entity) {
  //   throw new httpErrors.NotFound(`The user with id ${id} was not found`);
  // }

  // return entity;
};

const create = async user => {
  return User.create(user);
};

const update = async (id, data) => {
  return User.updateOne({ _id: id }, data);
  // const updatedUser = await DB.updateEntity(TABLE_NAME, id, data);

  // if (!updatedUser) {
  //   throw new httpErrors.NotFound(`The user with id ${id} was not found`);
  // }

  // return updatedUser;
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
  // if (!(await DB.deleteEntity(TABLE_NAME, id))) {
  //   throw new httpErrors.NotFound(`Could not remove user with id ${id}`);
  // }
};

module.exports = { getAll, getById, create, update, remove };
