const db = require('../database/db');

module.exports = {
    add,
    find,
    // findBy,
    // findById,
    // update,
    // remove
}

function find(id) {
    return db('usersjournal')
    .where({ id })
    .join('journal', 'usersjournal.journalId', 'journal.id')
    .select('id', 'exercise', 'weight', 'sets', 'reps', 'date', 'muscle', 'journal');
}

// function findBy(filter) {
//     return db('usersjournal')
//     .where(filter);
// }

// function findById(id) {
//     return db('usersjournal')
//     .select('id', 'username', 'password')
//     .where({id})
//     .first();
// }

function add(row) {
    return db('usersjournal')
    .insert(row)
    // .then(ids => {
    //     const [id] = ids; 
    //     return db('usersjournal')
    //     .select('id', 'username', 'password')
    //     .where({id})
    //     .first();
    // })
}

// function update(id, changes) {
//     return db('usersjournal')
//     .where('id', id)
//     .update(changes)
//     .then(() => {
//         const id = ids;
//         return db('usersjournal')
//         .where({id})
//         .first();
//     })
// }

// function remove(id) {
//     return db('usersjournal')
//     .where({id})
//     .delete();
// }