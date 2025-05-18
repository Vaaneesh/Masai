
const express = require('express');
const Profile = require('../models/profile');
const User = require('../models/user');
const router = express.Router();
router.post('/add-profile', async (req, res) => {
    try {
        const { bio, socialMediaLinks, user } = req.body;
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).send('User not found');
        }

        const profile = new Profile({ bio, socialMediaLinks, user });
        await profile.save();
        res.status(201).send(profile);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'name');
        res.send(profiles);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
