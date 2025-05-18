const Vehicle = require('../models/Vehicle');
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!vehicle) return res.status(404).send('Vehicle not found');
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).send('Vehicle not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addTripToVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).send('Vehicle not found');
        
        vehicle.trips.push(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateTrip = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        if (!vehicle) return res.status(404).send('Vehicle not found');

        const tripIndex = vehicle.trips.findIndex(trip => trip._id.toString() === req.params.tripId);
        if (tripIndex === -1) return res.status(404).send('Trip not found');
        
        vehicle.trips[tripIndex] = { ...vehicle.trips[tripIndex]._doc, ...req.body };
        await vehicle.save();
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteTripFromVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        if (!vehicle) return res.status(404).send('Vehicle not found');

        vehicle.trips = vehicle.trips.filter(trip => trip._id.toString() !== req.params.tripId);
        await vehicle.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVehiclesWithLongTrips = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.distance': { $gte: 200 }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVehiclesWithSpecificLocations = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.startLocation': { $in: ['Delhi', 'Mumbai', 'Bangalore'] }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVehiclesWithTripsStartingAfter = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.startTime': { $gte: new Date('2024-01-01') }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCarOrTruckVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            type: { $in: ['car', 'truck'] }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
