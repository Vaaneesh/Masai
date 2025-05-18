const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();
router.post('/vehicles', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/vehicles/:id', async (req, res) => {
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
});
router.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).send('Vehicle not found');
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/vehicles/:id/trips', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).send('Vehicle not found');
        
        vehicle.trips.push(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/vehicles/:vehicleId/trips/:tripId', async (req, res) => {
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
});
router.delete('/vehicles/:vehicleId/trips/:tripId', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        if (!vehicle) return res.status(404).send('Vehicle not found');

        vehicle.trips = vehicle.trips.filter(trip => trip._id.toString() !== req.params.tripId);
        await vehicle.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/vehicles/trips/length-gte-200', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.distance': { $gte: 200 }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/vehicles/trips/startLocation', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.startLocation': { $in: ['Delhi', 'Mumbai', 'Bangalore'] }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/vehicles/trips/startAfter', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            'trips.startTime': { $gte: new Date('2024-01-01') }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/vehicles/type', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({
            type: { $in: ['car', 'truck'] }
        });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
