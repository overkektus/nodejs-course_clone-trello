const DB = require('../../../common/db/tasks');

const getAll = async id => await DB.getAllTasks(id);

const getById = async id => {
  const task = await DB.getTask(id);

  if (!task) throw new Error(`The task with id ${id} was not found`);

  return task;
};

const create = async task => {
  const newTask = await DB.createTask(task);

  if (!newTask) throw new Error(`Could not create task with id ${task.id}`);

  return newTask;
};

const update = async (id, data) => {
  const task = await DB.updateTask(id, data);

  if (!task) throw new Error('Could not update task with id ${id}');

  return task;
};

const remove = async id => {
  const task = await DB.removeTask(id);

  if (!task) throw new Error('Could not remove task with id ${id}');

  return task;
};

const removeTasksByBoardId = async boardId => {
  await DB.removeTasksByBoardId(boardId);
};

const updateTasksUser = async userId => {
  await DB.updateTasksUser(userId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeTasksByBoardId,
  updateTasksUser
};
