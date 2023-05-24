/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

// import Image from 'next/image';
// import wordmarkLogo from '../public/wordmark_logo.png';
// import { Text } from '@nextui-org/react';

// import { Stack, Button } from '@chakra-ui/react';

import { Spacer, Text } from '@nextui-org/react';
import Page from '../components/Page';

export default function Home() {
    return (
        <Page title="Mr. Please" hero>
            <div className="w-[80vw] flex flex-col mx-auto">
                <Text size="$3xl" className="mt-4">
                    For Mr. Please it’s all about playing live.
                </Text>
                <Spacer h={2} />
                <Text size="$xl" className="mt-4">
                    A pandemic-born band, Mr. Please honed their live sound for
                    two years at Logan Street Studios in Louisville, Kentucky
                    before ever setting foot on stage.
                </Text>
                <Spacer h={2} />
                <Text size="$xl" className="mt-4">
                    Rock, blues, funk, and a sprinkle of jazz make the “Please”
                    sound. Thick atmosphere, rich texture, and a tapestry of
                    aural feels act as the cherry on top of this groovy cake.
                </Text>
                <Spacer h={2} />
                <Text size="$xl" className="mt-4">
                    Taking inspiration from bands like My Morning Jacket, Red
                    Hot Chili Peppers, Goose, Phish, Umphrey’s McGee, and Steely
                    Dan, Mr. Please aims to make something new out of those that
                    came before them, while still adhering to the openness and
                    free flowing energy that live improvisation demands.
                </Text>
                <Text size="$xl" className="mt-8 mb-16">
                    Comprised of Alex Hamilton (Guitar, Vocals), Jarrod
                    McCllelan (Bass guitar, Vocals), Ryan Chadwick (Drums,
                    Vocals, Percussion), Max Voorhees (Guitar, Vocals), Nico
                    Extra (Keys, Vocals), and Osama Kurdi (Percussion), the
                    sextet focuses on using their original tracks as vessels for
                    long improvisation and juicy jams.
                </Text>
                {/* <Stack direction="row">
                    <Button
                        bg="blue.400"
                        rounded="full"
                        color="white"
                        _hover={{ bg: 'blue.500' }}
                    >
                        Show me more
                    </Button>
                    <Button
                        bg="purple.400"
                        rounded="full"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.500' }}
                    >
                        Show me more
                    </Button>
                </Stack> */}
            </div>
        </Page>
    );
}
