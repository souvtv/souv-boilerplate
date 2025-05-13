import type { Hono } from "hono"

export default (r: Hono<HonoEnv>) => {
    r.get('*', (ctx) => {
        return ctx.env.ASSETS.fetch(ctx.req.raw)
    })
    .all('*', (ctx) => {
        return ctx.notFound()
    })
}
