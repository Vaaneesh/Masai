function Car(make, model, year, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isAvailable = isAvailable;
}
function Customer(name, rentedCars = []) {
    this.name = name;
    this.rentedCars = rentedCars;
}
Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
        console.log(`${this.name} has rented a ${car.make} ${car.model}.`);
    } else {
        console.log(`Sorry, the ${car.make} ${car.model} is already rented.`);
    }
};
Customer.prototype.returnCar = function(car) {
    const index = this.rentedCars.indexOf(car);
    if (index > -1) {
        car.isAvailable = true;
        this.rentedCars.splice(index, 1);
        console.log(`${this.name} has returned a ${car.make} ${car.model}.`);
        setTimeout(() => {
            console.log(`Return processed for ${car.make} ${car.model}.`);
        }, 2000);
    } else {
        console.log(`${this.name} does not have a ${car.make} ${car.model} rented.`);
    }
};
function PremiumCustomer(name, rentedCars = [], discountRate = 0.1) {
    Customer.call(this, name, rentedCars);
    this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;
function calculateRentalPrice(carType, days, customer) {
    const basePrice = 50; 
    const typeModifiers = {
        SUV: 1.5,
        Sedan: 1,
        Coupe: 1.2
    };
    
    let dailyRate = basePrice * (typeModifiers[carType] || 1);
    let totalPrice = dailyRate * days;
    
    if (customer instanceof PremiumCustomer) {
        totalPrice -= totalPrice * customer.discountRate;
    }
    
    return totalPrice;
}
function Maintenance(car, delay) {
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`The car ${car.make} ${car.model} has been marked as available after maintenance.`);
    }, delay);
}
const car1 = new Car('Toyota', 'Corolla', 2020);
const car2 = new Car('Honda', 'Civic', 2019, false);
const car3 = new Car('Ford', 'Escape', 2021);
const customer1 = new Customer('Alice');
const premiumCustomer1 = new PremiumCustomer('Bob');
customer1.rentCar(car1);
premiumCustomer1.rentCar(car3);
premiumCustomer1.rentCar(car2);
console.log(`Rental price for ${premiumCustomer1.name}: $${calculateRentalPrice('SUV', 3, premiumCustomer1)}`);
customer1.returnCar(car1);
premiumCustomer1.returnCar(car3);
Maintenance(car2, 3000);
