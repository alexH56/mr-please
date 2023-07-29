/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Head from 'next/head';
// import Image from 'next/image';
// import wordmarkLogo from '../public/wordmark_logo.png';
// import { Text } from '@nextui-org/react';
import { Text, Card, Button, Spacer } from '@nextui-org/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { useMediaQuery } from 'usehooks-ts';
import { upcomingShows } from '../../data/upcomingShows';

function CardContents({ show }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const desktopBody = (
        <Card.Body>
            <Grid templateColumns="repeat(15, 1fr)" columnGap={6}>
                <GridItem colSpan={3} className="flex items-center">
                    <Text h2>{show.date}</Text>
                </GridItem>

                <GridItem
                    colSpan={3}
                    className="flex justify-center items-center"
                >
                    <Text>{show.city}</Text>
                </GridItem>

                <GridItem
                    colSpan={5}
                    className="flex gap-2 justify-center items-center"
                >
                    <Text>{show.venue}</Text>
                    {show.free && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            FREE SHOW!
                        </span>
                    )}
                </GridItem>

                <GridItem
                    colSpan={4}
                    className="flex flex-col md:flex-row gap-4 justify-end items-center"
                >
                    {show.tickets && (
                        <a href={show.tickets} target="_blank" rel="noopener">
                            <Button
                                auto
                                color="secondary"
                                rounded
                                flat
                                className="w-full"
                            >
                                Tickets
                            </Button>
                        </a>
                    )}

                    {show.details && (
                        <a href={show.rsvp} target="_blank" rel="noopener">
                            <Button
                                auto
                                color="primary"
                                rounded
                                flat
                                className="w-full"
                            >
                                Details
                            </Button>
                        </a>
                    )}
                </GridItem>
            </Grid>
        </Card.Body>
    );

    const mobileBody = (
        <Card.Body className="flex flex-col gap-3 !pt-1 !px-4">
            <Text h2 className="!mb-0">
                {show.date}
            </Text>

            <Text className="!mb-0 font-normal text-2xl">{show.city}</Text>

            <Text>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                {show.venue}{' '}
                {show.free && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        FREE SHOW!
                    </span>
                )}
            </Text>

            <div className="flex gap-2">
                {show.tickets && (
                    <a href={show.tickets} target="_blank" rel="noopener">
                        <Button
                            auto
                            color="secondary"
                            rounded
                            flat
                            className="w-full"
                        >
                            Tickets
                        </Button>
                    </a>
                )}

                {show.details && (
                    <a href={show.rsvp} target="_blank" rel="noopener">
                        <Button
                            auto
                            color="primary"
                            rounded
                            flat
                            className="w-full"
                        >
                            Details
                        </Button>
                    </a>
                )}
            </div>
        </Card.Body>
    );
    console.log(isMobile);
    if (isMobile) {
        return mobileBody;
    }
    return desktopBody;
}

export default function Shows() {
    return (
        <div>
            <Head>
                <title>Mr. Please - Shows</title>
            </Head>

            <div className="w-full flex flex-col justify-center items-center mt-16 px-8">
                <Text h1>Upcoming Shows</Text>
                <Spacer h={4} />

                {upcomingShows.map((show) => (
                    <>
                        <Card
                            isHoverable
                            variant="bordered"
                            css={{ mw: '1000px' }}
                            className="mb-8"
                        >
                            <CardContents show={show} />
                        </Card>
                        <Spacer h={2} />
                    </>
                ))}
            </div>
        </div>
    );
}
