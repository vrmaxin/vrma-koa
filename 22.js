const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const sslify = require('koa-sslify').default; //http强制HTTPS
const https = require('https');//node内置https server
const fs = require('fs');
const app = new Koa()

const staticPath = './static'

app.use(static(
  path.join(__dirname, staticPath)
))

app.use(async (ctx) => {
  ctx.body = 'hello worldasd'
})

app.use(sslify())

// app.listen(3000, () => {
//   console.log(__dirname)
//   console.log(path.join(__dirname, staticPath))
//   console.log('server is starting at port 3000')
// })

var options = {
  key: fs.readFileSync('./private_key.pem'), //私钥文件路径
  cert: fs.readFileSync('./ca-cert.pem') //证书文件路径
};

https.createServer(options, app.callback()).listen(9527, () => {
  console.log(`server running success at 9527`)
});