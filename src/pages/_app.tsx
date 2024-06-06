import '../styles/css/globals.css';
import '../styles/css/bootstrap.min.css';
import '../styles/css/bootstrap-glyphicons.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;