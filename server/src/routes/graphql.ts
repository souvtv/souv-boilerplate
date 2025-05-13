import type { Hono } from 'hono'

export default (r: Hono<HonoEnv>, base = '') => {

    r.all(`${base}/graphql`, async (ctx) => {
        const url = new URL(ctx.req.url)

        const body = await ctx.req.json<GraphQLRequest>()

        const gqlReq: GraphQLRequest = body || {
            extensions: JSON.parse(url.searchParams.get('extensions') || '{}'),
            operationName: url.searchParams.get('operationName') || undefined,
            query: url.searchParams.get('query') || undefined,
            variables: JSON.parse(url.searchParams.get('variables') || '{}'),
        }

        const gqlHandler = (await import('@server/helpers/graphql')).gqlHandler
        const res = await gqlHandler(ctx, gqlReq)

        return ctx.json(res)
    })

}
