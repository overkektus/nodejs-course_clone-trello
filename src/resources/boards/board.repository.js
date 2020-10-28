// const httpErrors = require('http-errors');
const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById(id);
  // const entity = await DB.getEntityById(TABLE_NAME, id);

  // if (!entity) {
  //   throw new httpErrors.NotFound();
  // }

  // return entity;
};

const create = async board => {
  return Board.create(board);
  // await DB.addEntity(TABLE_NAME, board);
};

const update = async (id, data) => {
  return Board.findByIdAndUpdate(id, data);

  // const updatedBoard = await DB.updateEntity(TABLE_NAME, id, data);

  // if (!updatedBoard) {
  //   throw new httpErrors.NotFound(`Could not update board with id ${id}`);
  // }

  // return updatedBoard;
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
  // const board = await DB.deleteEntity(TABLE_NAME, id);

  // if (!board) {
  //   throw new httpErrors.NotFound(`Could not remove board with id ${id}`);
  // }

  // return board;
};

module.exports = { getAll, getById, create, update, remove };
