const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://frenzycoder:pTB0pqiOHMGUUkd4@cluster0.vcwpx.mongodb.net/manish?retryWrites=true&w=majority')

    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')

});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connected is disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

