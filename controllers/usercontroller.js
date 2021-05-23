const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../db').import('../models/user');

router.post('/signup',(req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(bcrypt.hashSync(req.body.user.password, salt))
    User.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        passwordHash: req.body.user.password,
        email: req.body.user.email,
    }).then((user) => {
                console.log(user.id)
                let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: user,
                    token: token
                })
            },
        ).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/signin', (req, res) => {
    console.log(req.body.user.username)
    User.findOne({ where: { username: req.body.user.username } }).then(user => {
        if (user) {
            if (req.body.user.password === user.passwordHash) {
                var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.json({
                    user: user,
                    message: "Successfully authenticated.",
                    sessionToken: token
                });
            } else {
                res.status(502).send({ error: "Passwords do not match." })
            }
        } else {
            res.status(403).send({ error: "User not found." })
        }

    })
})

module.exports = router;
