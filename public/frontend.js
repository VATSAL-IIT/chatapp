
const socket=io();
const frontendio=io.connect('http://localhost:4000');

var msg=document.querySelector('.input-message');
let msgarea=document.querySelector('.message-area');
let sendbtn=document.querySelector('.send_message_btn');

const user=prompt('Whats your name?');
msgarea.innerHTML+=` <div class="user-joined">
<h3>${user} Joined</h3>
</div>`
socket.emit('user-joined',user);
socket.on('user-connected',(data)=>{
msgarea.innerHTML+=` <div class="user-joined">
<h3>${data} Joined</h3>
</div>`
});
sendbtn.addEventListener('click',(e)=>{
    
    e.preventDefault();
    sendmessage();
})

socket.on('chat-message',(data)=>{
    addMessageToUI(false,data)
})

function sendmessage(){
 console.log(msgarea.innerHTML)
let data={
    message:msg.value,
    date:new Date().getDate(),
    month:new Date().getMonth(),
    year:new Date().getFullYear(),
    name:socket.id,
    time:new Date().getTime(),
}
socket.emit('message',data);
addMessageToUI(true,data);


}

function addMessageToUI(sentByMe,data)
{
    
console.log(msgarea.innerHTML)
if(sentByMe)
{   
    
    msgarea.innerHTML+=`<div class="message-right">
    <span>${data.message}</span>
    <div class="message-content">${data.date}  ${data.time}</div>
</div>`
}
else
{
   msgarea.innerHTML+=` <div class="message-left">
   <span>${data.message}</span>
   <div class="message-content">${data.date}  ${data.time}</div>
</div>`
}
}

async function videobtn()
{
    const res = await axios.get(`localhost:4000/chat/video`);
}


