

import * as React from "react"
import { createRoot } from 'react-dom/client';
import { Router } from "./routes";
import { Provider } from "./theme/provider";

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
<Provider>
    <Router/>
</Provider>
);