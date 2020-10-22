const userRepository = require('./user.memory.repository');

const getAll = () => userRepository.getAll();

const getById = id => userRepository.getById(id);

const create = user => userRepository.create(user);

const update = (id, user) => userRepository.update(id, user);

const remove = id => userRepository.remove(id);

module.exports = { getAll, getById, create, update, remove };
