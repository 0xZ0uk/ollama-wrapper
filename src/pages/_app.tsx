import { type AppType } from "next/app";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { fontSans } from "@/utils/fonts";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={cn("font-sans", fontSans.variable)}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
