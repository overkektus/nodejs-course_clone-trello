const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
