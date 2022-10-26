/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { theme, overrides } from '../styles/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    overrides();
    return (
        <NextUIProvider theme={theme}>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;
