/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { NextUIProvider } from '@nextui-org/react';
import { theme, overrides } from '../styles/theme';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
    overrides();
    const chakraTheme = extendTheme({
        components: {
            FormLabel: {
                baseStyle: {
                    marginBottom: '4px',
                    opacity: 0.75,
                    fontWeight: 'regular',
                    fontSize: '0.8rem',
                },
            },
            Heading: {
                baseStyle: {
                    fontWeight: 'black',
                },
            },
        },
    });
    return (
        <NextUIProvider theme={theme}>
            <ChakraProvider theme={chakraTheme}>
                <Navbar />
                <Component {...pageProps} />
            </ChakraProvider>
        </NextUIProvider>
    );
}

export default MyApp;
