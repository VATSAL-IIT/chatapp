const express=require('express');
const path=require('path');
const app=express();
const uuid=require('uuid');
const rooms={name:{},name2:{}};
const server=app.listen(4000,()=>{
    console.log("Server is listening on port",process.env.PORT || 4000)
});
app.use(express.json());
app.set('views','./views')
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));     //necessary for params.
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index',{rooms:rooms})
})
app.get('/chat/vid',(req,res)=>{
    res.render('video');
    res.end();
})
app.get('/:room',(req,res)=>{
    res.render('room',{roomName:req.params.room})        //rendering the room page
})
const socket=require('socket.io');
const io=socket(server);
io.on('connection',onConnected)

function onConnected(socket)
{
    console.log("Socket Connected",socket.id)
    socket.on('disconnect',(socket)=>{
        console.log("disconnected",socket.id)
    })
    socket.on('message',(data)=>{
        socket.broadcast.emit('chat-message',data);
       
    })
    socket.on('user-joined',(user)=>
    {
        socket.broadcast.emit('user-connected',user);
    })
}