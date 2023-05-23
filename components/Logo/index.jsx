/* eslint-disable import/no-named-default */
import React from 'react';

import { default as NextLink } from 'next/link';
import { PleaseHead } from '../PleaseHead';

export default function Logo() {
    return (
        <NextLink passHref href="/">
            <PleaseHead />
        </NextLink>
    );
}
