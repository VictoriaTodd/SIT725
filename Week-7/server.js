let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
const personRouter = require('./routers/personRouter');
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/person',personRouter);

io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

http.listen(port, ()=>{
    console.log('express server started');
});
