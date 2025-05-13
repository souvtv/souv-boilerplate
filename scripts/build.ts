import { cpSync, existsSync, mkdirSync, rmdirSync, writeFileSync } from 'node:fs'
import * as esbuild from 'esbuild'

import { AsyncGenerator } from 'graphql-ts-client-codegen'
import { buildASTSchema } from 'graphql'

import { getIntrospectedSchema, minifyIntrospectionQuery } from '@urql/introspection'
import path from 'node:path'

const typesPath = path.resolve('types')
const gqlPath = path.join(typesPath, 'graphql')
const tmpGQLPath = path.join(typesPath, '_graphql')

const generateGraphqlSchema = async () => {
  console.info('Generating GraphQL types...')

  const { typeDefs } = await import('../server/src/graphql')
  const ASTSchema = buildASTSchema(typeDefs)

  const filePath = '.schema.graphql'

  
  const minified = minifyIntrospectionQuery(getIntrospectedSchema(ASTSchema))
  writeFileSync(`${filePath}.json`, JSON.stringify(minified))
  

  // Create temp directory
  mkdirSync(path.join(typesPath, '_graphql'), { recursive: true })


  const generatorAsync = new AsyncGenerator({
    scalarTypeMap: {
      //
    },
    schemaLoader: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return ASTSchema as any
    },
    targetDir: tmpGQLPath,
  })

  await generatorAsync.generate()
  await new Promise<void>(resolve => {
    setTimeout(() => {
      try {
        if (existsSync(gqlPath)) {
          rmdirSync(gqlPath, { recursive: true })
        }

        cpSync(tmpGQLPath, gqlPath, { recursive: true })
        rmdirSync(tmpGQLPath, { recursive: true })
      } catch (err) {
        console.error(err)
      }

      resolve()
    }, 500)
  })

  console.info('GraphQL types generated successfully')
}


const run = async () => {


  await generateGraphqlSchema()


  // Build app
  esbuild.build({
    entryPoints: ['client/src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    splitting: true,
    format: 'esm',
    jsx: 'automatic',
    outExtension: { '.js': '.mjs' },
    assetNames: `[ext]/[name]-[hash]`,
    chunkNames: `[ext]/[name]-[hash]`,
    entryNames: `index`,
    platform: 'browser',
    outdir: 'dist',
    target: 'es2021',
  })

  cpSync(`client/public`, `dist`, { recursive: true })

}

run()