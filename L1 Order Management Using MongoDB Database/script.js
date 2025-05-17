const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('order_management'); 
        const ordersCollection = database.collection('orders'); 
        const sampleOrders = [
            {
                order_id: 1,
                customer_name: 'John Doe',
                items: ['Laptop', 'Mouse'],
                total_amount: 65000,
                order_status: 'pending'
            },
            {
                order_id: 2,
                customer_name: 'Jane Smith',
                items: ['Headphones', 'Charger'],
                total_amount: 3000,
                order_status: 'shipped'
            },
            {
                order_id: 3,
                customer_name: 'Alice Johnson',
                items: ['Mobile Phone'],
                total_amount: 20000,
                order_status: 'delivered'
            },
            {
                order_id: 4,
                customer_name: 'Bob Brown',
                items: ['Tablet', 'Keyboard'],
                total_amount: 15000,
                order_status: 'pending'
            },
            {
                order_id: 5,
                customer_name: 'Chris Green',
                items: ['Smartwatch'],
                total_amount: 7000,
                order_status: 'shipped'
            }
        ];
        await ordersCollection.insertMany(sampleOrders);
        console.log('Sample orders inserted.');
        const shippedOrders = await ordersCollection.find({ order_status: 'shipped' }).toArray();
        console.log('Shipped Orders:', shippedOrders);
        await ordersCollection.updateOne(
            { order_id: 1 },
            { $set: { total_amount: 70000 } }
        );
        console.log('Updated order_id 1 total_amount to 70000.');
        await ordersCollection.deleteOne({ order_id: 4 });
        console.log('Deleted order_id 4.');
        const aliceOrder = await ordersCollection.findOne({ customer_name: 'Alice Johnson' });
        console.log('Order for Alice Johnson:', aliceOrder);
        await ordersCollection.updateOne(
            { order_id: 2 },
            { $set: { order_status: 'delivered' } }
        );
        console.log('Updated order_id 2 status to delivered.');
        const highValueOrders = await ordersCollection.find({ total_amount: { $gte: 15000 } }).toArray();
        console.log('Orders with total_amount >= 15000:', highValueOrders);

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
