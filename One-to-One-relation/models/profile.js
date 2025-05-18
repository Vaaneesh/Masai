const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: { 
        type: String, 
        optional: true 
    },
    socialMediaLinks: { 
        type: [String], 
        optional: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
