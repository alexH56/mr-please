import React from 'react';

import { Text } from '@nextui-org/react';
import Page from '../../components/Page';
import MusicCard from '../../components/MusicCard';

export default function Home() {
    return (
        <Page title="Music">
            <div className="w-full flex flex-col justify-center items-center mt-16">
                <Text h1>Our Music</Text>
            </div>
            <div className="flex gap-8 flex-wrap justify-center items-center mt-8">
                <MusicCard />
                <MusicCard />
                <MusicCard />
            </div>
        </Page>
    );
}
