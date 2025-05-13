type HonoEnv = {
  Bindings: CFWorkerEnv
  Variables: Variables
}

declare type HonoContext = import('hono').Context<HonoEnv>