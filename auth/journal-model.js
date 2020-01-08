const db = require('../database/db');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

function find() {
    return db('journal')
    .select('id', 'exercise', 'weight', 'sets', 'reps', 'date', 'muscle', 'journal');
}

function findBy(filter) {
    return db('journal')
    .where(filter);
}

function findById(id) {
    return db('journal')
    .select('id', 'exercise', 'weight', 'sets', 'reps', 'date','muscle', 'journal')
    .where({id})
    .first();
}

function add(user) {
    return db('journal')
    .insert(user)
    .then(ids => {
        const [id] = ids; 
        return db('journal')
        .select('id', 'exercise', 'weight', 'sets', 'reps', 'date', 'muscle', 'journal')
        .where({id})
        .first();
    })
}

function update(id, changes) {
    return db('journal')
    .where('id', id)
    .update(changes)
    // .then(ids => {
    //     const [id] = ids;
    //     return db('journal')
    //     .where({id})
    //     .first();
    // })
    .then(() => {
        return db('journal')
        .where({id})
        .first();
    })
}

function remove(id) {
    return db('journal')
    .where({id})
    .delete();
}