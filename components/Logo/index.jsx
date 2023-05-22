/* eslint-disable import/no-named-default */
import React from 'react';

import { default as NextLink } from 'next/link';
import { PleaseHead } from '../PleaseHead';

function Logo() {
    return (
        <NextLink passHref href="/">
            <PleaseHead />
        </NextLink>
    );
}

export default Logo;
