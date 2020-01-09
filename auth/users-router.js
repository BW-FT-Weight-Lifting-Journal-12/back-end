const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./users-model');
const restricted = require('./auth-middleware');

const Projects = require('./users-model');


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


// router.post('/', (req, res) => {
//     const newProject = req.body;

//     Projects.add(newProject)
//         .then(project => {
//             res
//                 .status(201)
//                 .json(project);
//         })
//         .catch (error => {
//             console.log(error);
//             res
//                 .status(500)
//                 .json({ message: 'Error reaching server.' });
//         });
// });

module.exports = router;