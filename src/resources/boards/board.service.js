const boardsRepository = require('./board.memory.repository');
const tasksRepository = require('../tasks/tasks.memory.repository');

const getAll = () => boardsRepository.getAll();

const getById = id => boardsRepository.getById(id);

const create = board => boardsRepository.create(board);

const update = (id, board) => boardsRepository.update(id, board);

const remove = async id => {
  await tasksRepository.removeByBoardId(id);
  return await boardsRepository.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
