import express from 'express';
import logger from "morgan";

import { Server } from 'socket.io';
import { createServer} from 'node:http';

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected');

    // Para escuchar las desconecciones
    socket.on('disconnect', () => {
        console.log("an user disconnected");
    });

    // Para escuchar el HUB de l chat

    socket.on('chat message', (message) => {
        // console.log('message : ' + message);
        
        // Emiitirlo a todos los usuarios
        io.emit('chat message', message);
        
    });
});

app.use(logger('dev'))

app.get('/', (req, res) => {
    // res.send('<h1>Hello word</h1>');
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})