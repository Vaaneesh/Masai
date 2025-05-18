const mongoose = require('mongoose');
const connectToDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/userAddressManagement';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connection established successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); 
    }
}
module.exports = { connectToDatabase };
