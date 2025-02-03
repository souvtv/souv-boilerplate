import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('*', (c) => {
  return c.env.ASSETS.fetch(c.req.raw)
})

export default app