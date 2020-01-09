const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Journal = require('./journal-model');
const restricted = require('./auth-middleware');

router.get('/', (req, res) => {
    Journal.find().then(project => {
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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Journal.findById(id).then(project => {
        res
            .status(200).json(project);
    })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
    });
});


router.post('/', (req, res) => {
    const newProject = req.body;

    Journal.add(newProject)
        .then(project => {
            res
                .status(201)
                .json(project);
        })
        .catch (error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
        });
});

// filtering users for specific journal
router.get('/:users_id/journal', (req, res) => {
    const users_id = req.params.users_id;
    Journal.findAllByProjectId(users_id)
        .then(journal => {
            res
                .status(200)
                .json(journal.map(Journal.changeCompletedProperty));
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
        });
});

router.get('/:users_id/journal/:id', (req, res) => {
    const id = req.params.id;
    Journal.findById(id)
        .then(task => {
            res
                .status(200)
                .json(Journal.changeCompletedProperty(task));
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ message: 'Error reaching server.' });
        });
});

router.put('/:id', (req, res) => {
    const {id} = req.params
    let changes = req.body;
    Journal.update(id, changes)
    .then(project => {
        if (project) {
            Journal.findById(id)
            .then(update => {
                res.json(update);
            });
        } else {
            res.status(404).json({ message: 'Cannot find given id'});
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: 'Failed to update'})
    })
});

router.delete('/:id', (req, res) => {
    Journal.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "Journal has been removed from the database"})
        } else {
            res.status(404).json({message: "Journal does not exist!"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;