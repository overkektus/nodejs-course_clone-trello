const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'some task description',
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    // TODO: implement
    return task;
  }
}

module.exports = Task;
