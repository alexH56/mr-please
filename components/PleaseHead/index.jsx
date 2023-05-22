import React from 'react';
import Image from 'next/image';
import pleaseHead from '../../public/please_head.png';

export function PleaseHead() {
    return <Image src={pleaseHead} width="48" height="48" />;
}
