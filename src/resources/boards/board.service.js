const boardsRepository = require('./board.repository');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardsRepository.getAll();

const getById = id => boardsRepository.getById(id);

const create = board => boardsRepository.create(board);

const update = (id, board) => boardsRepository.update(id, board);

const remove = async id => {
  const isDeleted = !!boardsRepository.remove(id);
  if (isDeleted) {
    tasksService.removeByBoardId(id);
  }
  return isDeleted;
};

module.exports = { getAll, getById, create, update, remove };
