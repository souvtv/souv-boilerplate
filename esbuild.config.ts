import { cpSync } from 'node:fs'
import * as esbuild from 'esbuild'


esbuild.build({
    entryPoints: ['client/src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: false, 
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
