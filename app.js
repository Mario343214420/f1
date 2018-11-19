/**
 * Created by Administrator on 2018/11/19.
 */
const express = require('express')
const app = express()
const sha1 = require('sha1')
/*app.get:路由，路径无法确定，回看前面知识点
**************************************
  app.use:中间件，
*/
const config = {
  appID: 'wx4978781611d6785c',
  appsecret: '2e62037506b7e5f5475f9d9d3e9624a3',
  token: 'mario343214420'
  }



;app.use((req, res, next) => {
  console.log(req.query);
  //查询字符串参数
  const {signature, echostr, timestamp, nonce} = req.query
  const {token} = config
  const arr = [timestamp, nonce, token].sort()
  //获取到的微信平台传送来的signature, echostr, timestamp, nonce，然后组成数组，进行数组排序赋值
  const str = sha1(arr.join(''))
  //讲数组利用join处理，join内填写的是数组各值的中间分隔
  if(signature === str){
    res.end(echostr)
  }else{
   res.end('err')
  }
})
;app.listen(5000, err => {
  if (!err) console.log('服务器已正常启动')
  else console.log(err)
})