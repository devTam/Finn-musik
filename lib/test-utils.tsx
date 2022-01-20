import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../lib/createEmotionCache";
import { Provider } from "../context";

import theme from "../styles/theme";

const AllTheProviders: FC = ({ children }) => {
  const clientSideEmotionCache = createEmotionCache();
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Provider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
