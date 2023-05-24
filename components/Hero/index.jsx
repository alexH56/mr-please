/* eslint-disable object-curly-newline */
import React from 'react';

import { Stack, Flex, VStack, useBreakpointValue } from '@chakra-ui/react';

import Image from 'next/image';

import wordmarkLogo from '../../public/wordmark_logo.png';

export default function WithBackgroundImage() {
    return (
        <Flex
            w="full"
            h="100vh"
            backgroundImage="url(/heroimg.jpg)"
            // backgroundColor="blackAlpha.900"
            backgroundSize="cover"
            backgroundPosition="center center"
            // className="bg-black"
        >
            <VStack
                w="full"
                justify="center"
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient="linear(to-r, blackAlpha.700, transparent)"
            >
                <Stack maxW="2xl" align="flex-start" spacing={6}>
                    <Image
                        src={wordmarkLogo}
                        width="306"
                        height="396"
                        className="hvr-hang"
                    />
                </Stack>
            </VStack>
        </Flex>
    );
}
