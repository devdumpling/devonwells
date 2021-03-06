import { createGlobalStyle } from 'styled-components';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'styles/styles.css';

const LocalGlobalStyle = createGlobalStyle`
  #__next {        
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Devon Wells</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LocalGlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
