/**
 * Created by Administrator on 2018/11/19.
 */
const {parseString} = require ('xml2js')

module.exports = {
  getUserDataAsync (req){
    return new Promise(resolve => {
      let result = ''
      req
        .on('data', data => {
          console.log(data.toString())
          result += data.toString()
        })
        .on('end', () => {
          console.log('用户数据接收完毕')
          resolve(result)
        })
    })
  },
  parseXMLDataAsync (xmlData){
    return new Promise((resolve, reject) => {
      parseString(xmlData, {trim: true}, (err,data) => {
        if (!err){
          resolve(data)
        } else {
          reject('parseXMLDataAsync方法出错' + err)
        }
      })
    })
  },
  formatMessage ({xml}){
    //对象，只能用for in
    let result = {}
    for (let key in xml){
      let value = xml[key]
      result[key] = value[0]
    }
    return result
  }
}