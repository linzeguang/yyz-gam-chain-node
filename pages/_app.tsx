import React from "react";
import type { AppProps } from "next/app";
import ResetCSS from "../styles/ResetCSS";
import Layout from "../components/Layout";
import Providers from "./Providers";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <ResetCSS />
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </React.Fragment>
  );
};

export default App;
