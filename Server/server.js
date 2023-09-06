const express = require("express");
const http = require("http");
const cors = require('cors');
const socketIO = require('socket.io');
const {v4: uuidv4} = require('uuid');

const connections = new Map();

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server, 
    {
        cors:
        {
            origin: "http://localhost:5173"
        }
    });

io.on('connection', (socket) => 
{
    console.log('A user connected');

    const connectionID = uuidv4();
    connections.set(connectionID, socket);

    socket.on('message', (message) => 
    {
        console.log(`Received message: ${message.msg} from ${connectionID}`);
        message.username = connectionID.substring(0, 6);
        io.emit('return', message);
    });

    socket.on('disconnect', () => 
    {
        console.log('A user disconnected');
        connections.delete(connectionID);
    });
})

const corsOptions =
{
    origin: 'http://localhost:5173',
    methods: 'POST',
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/", (req, res) => 
{
    console.log("Request recieved.");
    console.log(req.body);
    res.send();
});

server.listen(port, () => {console.log("Server Initialised on port: " + port)});