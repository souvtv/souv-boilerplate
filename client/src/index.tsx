

import * as React from "react"
import { createRoot } from 'react-dom/client';
import { Router } from "./routes";
import { Provider } from "./theme/provider";
import { gqlClient, UrqlProvider } from "./api";


const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
<Provider>
    <UrqlProvider value={gqlClient}>
        <Router/>
    </UrqlProvider>
</Provider>
);