import React from "react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import ResetCSS from "../styles/ResetCSS";
import GlobalStyle from "../styles/GlobalStyle";
import Layout from "../components/Layout";
import Providers from "../components/common/Providers";
import "rc-dialog/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

import "../i18n";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <ResetCSS />
      <GlobalStyle />
      <ToastContainer />

      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </React.Fragment>
  );
};

export default App;
