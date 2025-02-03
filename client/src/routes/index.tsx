import React from "react";

import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "../pages/home";
import { Hello } from "../pages/hello";
import { MainLayout } from "../layout/mainLayout";
import { ConfigLayout } from "@client/layout/configsLayout";




export const Router = () => (
<BrowserRouter>
  <Routes>
    <Route element={<MainLayout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/hello" element={<Hello />} />

      <Route element={<ConfigLayout/>}>
      <Route path="/settings" element={<Hello />} />

    </Route>
    </Route>

    <Route path={"*"} element={<div>Not Found</div>} />
  </Routes>
</BrowserRouter>
)
