import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';

import { Player } from './models/playerModel.js';
import { Game } from './models/gameModel.js';
import playerRouter from './routes/playerRoutes.js';
import gameRouter from './routes/gameRoutes.js';

const app = express();
app.use(cors()) 
// middleware for parsing application/json
app.use(express.json());
app.use('/games', gameRouter);
app.use('/players', playerRouter);

// defines a route handler for HTTP GET requests made to the root URL ("/") of the application
// The second argument is a callback function
// that is executed whenever a GET request is made to the specified path
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('hellooo')
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    }); 
    