import { Hono } from 'hono'
import graphql from './routes/graphql'
import pages from './routes/pages'

const app = new Hono<HonoEnv>()

app.use((_ctx, next)=>{
  // middleware

  return next()
})

//
//
// API

graphql(app, '/api')

//
//
//

//
// Serve pages
pages(app)
//
//


export default app