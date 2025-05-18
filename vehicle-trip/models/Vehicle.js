const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid distance! It must be greater than 0.`
        }
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
}, { _id: false }); 
const vehicleSchema = new mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true },
    type: {
        type: String,
        enum: ['car', 'truck', 'bike'],
        required: true
    },
    model: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    trips: { type: [tripSchema], default: [] }
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
