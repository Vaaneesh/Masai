function createCar(make, model, year) {
    return {
        make: make,
        model: model,
        year: year,
        describeCar: function() {
            console.log(`This car is a ${this.year} ${this.make} ${this.model}.`);
        }
    };
}

const car = createCar("Kia", "Seltos", 2021);
car.describeCar();
