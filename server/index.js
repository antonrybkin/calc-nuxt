import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import cors from 'koa2-cors'
import * as compress from 'koa-compress'

const corsOptions = {
  origin: 'http://localhost:5000'
}

async function start() {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    console.log('NUXT is in dev mode')
    app.use(cors(corsOptions))

    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      console.log(
        ctx.request.method + ' ' + ctx.request.url + ' = ' + ctx.response.status
      )
      if (ctx.request.url === '/') console.log(ctx)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.use(
    compress({
      filter: function(content_type) {
        console.log('Content-Type: ' + content_type)
        return /text/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    })
  )

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
