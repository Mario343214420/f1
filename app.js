/**
 * Created by Administrator on 2018/11/19.
 */
const express = require('express')
const app = express()
const sha1 = require('sha1')
const {getUserDataAsync, parseXMLDataAsync, formatMessage} = require('./modules/tools')
const template = require('./modules/template')
/*app.get:路由，路径无法确定，回看前面知识点
 **************************************
 app.use:中间件，
 */
const config = {
  appID: 'wx4978781611d6785c',
  appsecret: '2e62037506b7e5f5475f9d9d3e9624a3',
  token: 'mario343214420'
}
app.use(async (req, res, next) => {
  console.log(req.query)
  //查询字符串参数
  const {signature, echostr, timestamp, nonce} = req.query
  const {token} = config
  const arr = [timestamp, nonce, token].sort()
  
  const str = sha1(arr.join(''))
  if (req.method === 'GET') {
    if (signature === str) {
      res.end(echostr)
    } else {
      res.end('error')
    }
  } else if (req.method === 'POST') {
    //res.end('error')
    if (signature !== str) {
      res.end('error')
      return
    }
    const xmlData = await getUserDataAsync(req)
    const jsData = await parseXMLDataAsync(xmlData)
    const message = formatMessage(jsData)
    console.log(message)
    
    // 初始配置对象
    let options = {
      toUserName: message.FromUserName,
      fromUserName: message.ToUserName,
      createTime: Date.now(),
      msgType: 'text'
    }
    let content = '您说的嘛'
    let msgType = 'text'
    
    if (message.Content === '1') {
      content = '雷猴啊'
    } else if (message.Content === '2') {
      content = '套你猴子'
    } else if (message.Content.includes('s')) {
      content = '看你熊样子'
    } else if (message.Content.includes('3')) {
      options.msgType = 'news'
      options.title1 = '微信公众号开发~'
      options.description1 = 'h5-0810'
      options.picUrl = 'http://www.atguigu.com/images/logo.jpg'
      options.url = 'www.baidu.com'
    }
    options.content = content
    const replyMessage = template(options)
    
    res.send(replyMessage)
    //微信服务器在没有接收到开发者服务器时，默认请求三次开发者服务器
    //解决：返回res.end('')
    
  } else {
    res.end('error')
  }
  
})
app.listen(5000, err => {
  if (!err) console.log('服务器已正常启动')
  else console.log(err)
})