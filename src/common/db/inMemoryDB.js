const User = require('../../resources/users/user.model');
const Board = require('../../resources/boards/board.model');
const Task = require('../../resources/tasks/tasks.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: [],

  fixUsersStructure: user => {
    if (user) {
      DB.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },

  fixBoardsStructure: board => {
    if (board) {
      DB.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (DB.Tasks[DB.Tasks.indexOf(task)] = undefined)
      );
    }
  },

  fixTasksStructure: () => {}
};

(() => {
  const board = new Board();
  for (let i = 0; i < 3; i++) {
    DB.Users.push(new User());
  }
  DB.Boards.push(board);
  DB.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
})();

const getAllTable = tableName => DB[tableName].filter(entity => entity);

const getEntityById = (tableName, id) => {
  const entities = getAllTable(tableName).filter(entity => entity.id === id);

  if (entities.length > 1) {
    throw Error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
  }

  return entities[0];
};

const addEntity = (tableName, entity) => {
  DB[tableName].push(entity);

  return getEntityById(tableName, entity.id);
};

const updateEntity = (tableName, id, entity) => {
  const oldEntity = getEntityById(tableName, id);
  if (oldEntity) {
    DB[tableName][DB[tableName].indexOf(oldEntity)] = { ...entity };
  }

  return getEntityById(tableName, id);
};

const deleteEntity = (tableName, id) => {
  const removeEntity = getEntityById(tableName, id);
  if (removeEntity) {
    DB[`fix${tableName}Structure`](removeEntity);
    const index = DB[tableName].indexOf(removeEntity);
    DB[tableName] = [
      ...DB[tableName].slice(0, index),
      ...(DB[tableName].length > index + 1
        ? DB[tableName].slice(index + 1)
        : [])
    ];
  }

  return removeEntity;
};

const deleteAll = async (tableName, id) => {
  const result = [];

  const entitiesToRemove = DB[tableName].filter(item => {
    for (const [key, val] of Object.entries(id)) {
      if (item[key] !== val) {
        return false;
      }
    }

    return true;
  });

  for (const item of entitiesToRemove) {
    await deleteEntity(tableName, item.id);
  }

  return result;
};

module.exports = {
  getAllTable,
  getEntityById,
  addEntity,
  updateEntity,
  deleteEntity,
  deleteAll
};
