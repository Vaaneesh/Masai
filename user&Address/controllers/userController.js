const User = require('../models/User');
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = new User({ name, email, age });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
