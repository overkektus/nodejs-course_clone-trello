const taskRepository = require('./tasks.memory.repository');

const getAll = id => taskRepository.getAll(id);

const getById = id => taskRepository.getById(id);

const create = task => taskRepository.create(task);

const update = (id, task) => taskRepository.update(id, task);

const remove = id => taskRepository.remove(id);

const removeByBoardId = boardId => taskRepository.removeByBoardId(boardId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeByBoardId
};
