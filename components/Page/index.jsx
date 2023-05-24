/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import Hero from '../Hero';

export default function Page({ title, hero = false, children }) {
    const heroContent = hero && <Hero />;
    return (
        <>
            <Head>
                <title>Mr. Please - {title}</title>
            </Head>
            <main>
                {heroContent}
                <div className="flex justify-center p-12">
                    <div className="flex flex-col w-full max-w-screen-xl">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
}

Page.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
};
