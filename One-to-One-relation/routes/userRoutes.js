const express = require('express');
const User = require('../models/user');
const router = express.Router();
router.post('/add-user', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
