import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider = (props) => {
  return (
    <NextThemesProvider {...props}>
      {props.children}
    </NextThemesProvider>
  );
};