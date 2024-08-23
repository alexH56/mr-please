/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable import/no-named-default */
import React from 'react';

import Link from 'next/link';
import { PleaseHead } from '../PleaseHead';

export default function Logo() {
    return (
        <Link href="/">
            <PleaseHead />
        </Link>
    );
}
