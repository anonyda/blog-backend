const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: "./config.env"});
console.log(process.env.DB_LOCAL);

mongoose.connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then((connection) => {
        console.log('Connected to DB');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to requests at port ${process.env.PORT}`);
        })
                     
    })
    .catch((err) => {
        console.log('Error in DB Connection', err);
    })
        
