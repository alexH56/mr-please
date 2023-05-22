/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Head from 'next/head';
// import Image from 'next/image';
// import wordmarkLogo from '../public/wordmark_logo.png';
// import { Text } from '@nextui-org/react';
import { Spacer, Text } from '@nextui-org/react';

import Nav from '../components/Navbar';
import VideoHero from '../components/VideoHero';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Mr. Please</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <VideoHero />
            <main className="w-full flex justify-center">
                <div className="w-[80vw] flex flex-col">
                    <Text size="$xl" className="mt-24">
                        For Mr. Please it’s all about playing live.
                    </Text>
                    <Spacer h={2} />
                    <Text size="$xl" className="mt-8">
                        A pandemic-born band, Mr. Please honed their live sound
                        for two years at Logan Street Studios in Louisville,
                        Kentucky before ever setting foot on stage.
                    </Text>
                    <Spacer h={2} />
                    <Text size="$xl" className="mt-8">
                        Rock, blues, funk, and a sprinkle of jazz make the
                        “Please” sound. Thick atmosphere, rich texture, and a
                        tapestry of aural feels act as the cherry on top of this
                        groovy cake.
                    </Text>
                    <Spacer h={2} />
                    <Text size="$xl" className="mt-8">
                        Taking inspiration from bands like My Morning Jacket,
                        Red Hot Chili Peppers, Goose, Phish, Umphrey’s McGee,
                        and Steely Dan, Mr. Please aims to make something new
                        out of those that came before them, while still adhering
                        to the openness and free flowing energy that live
                        improvisation demands.
                    </Text>
                    <Text size="$xl" className="mt-8">
                        Comprised of Alex Hamilton (Guitar, Vocals), Jarrod
                        McCllelan (Bass guitar, Vocals), Ryan Chadwick (Drums,
                        Vocals, Percussion), Max Voorhees (Guitar, Vocals), Nico
                        Extra (Keys, Vocals), and Osama Kurdi (Percussion), the
                        sextet focuses on using their original tracks as vessels
                        for long improvisation and juicy jams.
                    </Text>
                </div>
            </main>
        </div>
    );
}
