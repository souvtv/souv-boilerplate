"use client"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "../components/ui/color-mode"

import BaseTheme from "."

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={BaseTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
