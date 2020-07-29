var ws = require('nodejs-websocket');
let conn = []
function addConn(connections){
 conn.push(connections)

}
function removeConn(socket) {
  let closeIndex;
 conn.forEach((item,index)=>{
  // console.log(item,'item',JSON.parse(socket.frameBuffer))
  if(item.info.userInfo.userId ===JSON.parse(socket.frameBuffer).userInfo.userId) {
    // console.log('sfegegeethe')
    closeIndex = index
  }
 })
 conn.splice(closeIndex,1)
//  console.log(conn,'ssssssssssssssssssconnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
}
function sendAll(message,messageCode,userInfo){
  let length = conn.length
  let userAll = []
  for (let i = 0; i < length; i++) {
    // conn[i].socket.sendText(JSON.stringify({sendCode:messageCode,message:message,conn:conn}))
    userAll.push(conn[i].info)
  }
  for (let i = 0; i < length; i++) {
    conn[i].socket.sendText(JSON.stringify({sendCode:messageCode,message:message,conn:userAll,userInfo}))
    
  }
}
function isInConn(userInfo){
 let result = conn.some((item)=>{
   item.userId == userInfo.userId
 })
 return result
}

var server = ws.createServer(function(socket){
// 事件名称为text(读取字符串时，就叫做text)，读取客户端传来的字符串
    socket.on('text', function(clientInfo) {
　　     // 在控制台输出前端传来的消息　　
        let info = JSON.parse(clientInfo)
        let {messageCode,message,userInfo} = info
        if(messageCode == 'NEW_CONNECTION') {
          addConn({info,socket})
          let needSendMsg = `欢迎${userInfo.username}`
          sendAll(needSendMsg,messageCode)
          console.log('新建连接')
        } else if(messageCode == "NORMAL_CONNECTION") {
          // socket.sendText(JSON.stringify('正常'));
          // let needSendMsg = `欢迎${userInfo.username}`
          sendAll(message,messageCode,userInfo)
          console.log('正常')
        } else if(messageCode == "ERROR_CONNECTION") {
          console.log('错误')
        } else if(messageCode == "CLOSE_CONNECTION") {
          // removeConn(socket)
          console.log(socket,'closessssssssssssssssssssssssssssssssss')
          removeConn(socket)
          let needSendMsg = `${userInfo.username}离开`
          sendAll(needSendMsg,messageCode)
          socket.close()
          console.log('申请关闭')
        }

        //向前端回复消息
        
        
    });

    socket.on('close',function(re){
      // console.log('close',re,server.connections)
      // socket.sendText('关闭');
    })
    socket.on('error', function(code) {
      console.log('异常关闭', code)
    })
})
server.listen(4000);
// module.exports = server