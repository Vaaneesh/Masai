const User = require('../models/user');
exports.addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUserRentals = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('rentedBooks');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.rentedBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
