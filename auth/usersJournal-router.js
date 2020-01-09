const router = require('express').Router();
const UsersJournal = require('./usersJournal-model');
const restricted = require('./auth-middleware');

router.get('/:id/journal', (req, res) => {
    const {id} = req.params
    UsersJournal.find(id).then(project => {
        res
            .status(200)
            .json(project);
    })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
    });
});

router.post('/:id/journal', (req, res) => {
    const {id} = req.params
    const {item} = req.body;
    const savedJournal = {journal_id:item}

    UsersJournal.find(id).then(project => {
        res
            .status(200)
            .json(project);
    })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
    });
});

module.exports = router;