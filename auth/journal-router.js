const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./model');
const restricted = require('./auth-middleware');

const Projects = require('./journal-model');


router.get('/', (req, res) => {
    Projects.find().then(project => {
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
    Projects.findById(id).then(project => {
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

    Projects.add(newProject)
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

router.put('/:id', (req, res) => {
    const {id} = req.params
    let changes = req.body;
    Projects.update(id, changes)
    .then(project => {
        if (project) {
            Projects.findById(id)
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

    // if (!changes.exercise) {
    //     res.status(422).json({message: "Missing field: exercise"})
    // }
    // if (!changes.weight) {
    //     res.status(422).json({message: "Missing field: weight"})
    // }
    // if (!changes.sets) {
    //     res.status(422).json({message: "Missing field: sets"})
    // }
    // if (!changes.reps) {
    //     res.status(422).json({message: "Missing field: reps"})
    // }
    // if (!changes.date) {
    //     res.status(422).json({message: "Missing field: date"})
    // }
    // if (!changes.muscle) {
    //     res.status(422).json({message: "Missing field: muscle"})
    // }
    // if (!changes.journal) {
    //     res.status(422).json({message: "Missing field: journal"})
    // }
});

router.delete('/:id', restricted, (req, res) => {
    Users.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "User has been removed from the database"})
        } else {
            res.status(404).json({message: "User does not exist!"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;