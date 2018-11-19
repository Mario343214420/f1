/**
 * Created by Administrator on 2018/11/19.
 */
module.exports = {
  getUserDataAsync (req){
    return new Promise(resolve => {
      let result = ''
      req
        .on('data', data => {
          console.log(data.toString())
          result += data.toString()
        })
        // .on('end', () => {
        //   console.log('用户数据接收完毕')
        //   resolve(result)
        // })
    })
  }
}