const Board = require('./board.model');

const findAll = async () => {
  return Board.find({});
};
const findOne = async id => {
  return Board.findById(id);
};
const createOne = async board => {
  return Board.create(board);
};
const updateOne = async board => {
  return Board.findByIdAndUpdate(board.id, board);
};
const removeOne = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
