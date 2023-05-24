/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Head from 'next/head';
// import Image from 'next/image';
// import wordmarkLogo from '../public/wordmark_logo.png';
// import { Text } from '@nextui-org/react';
import { Text, Card, Button, Spacer } from '@nextui-org/react';

export default function Shows() {
    return (
        <div>
            <Head>
                <title>Mr. Please - Shows</title>
            </Head>

            <div className="w-full flex flex-col justify-center items-center mt-16">
                <Text h1>Upcoming Shows</Text>
                <Card
                    isHoverable
                    variant="bordered"
                    css={{ mw: '1000px' }}
                    className="mb-8"
                >
                    <Card.Body>
                        <div className="flex justify-between items-center">
                            <Text h2>May 25</Text>
                            <Text>Chillicothe, IL</Text>
                            <Text>Summer Camp Music Festival</Text>
                            <a href="https://summercampfestival.com/tickets/">
                                <Button auto color="secondary" rounded flat>
                                    Tickets
                                </Button>
                            </a>
                        </div>
                    </Card.Body>
                </Card>
                <Spacer h={2} />
                <Card
                    isHoverable
                    variant="bordered"
                    css={{ mw: '1000px' }}
                    className="mb-8"
                >
                    <Card.Body>
                        <div className="flex justify-between items-center">
                            <Text h2>Jun 1</Text>
                            <Text>New Albany, IN</Text>
                            <Text>The Enchanted Forest</Text>
                            <a href="https://www.facebook.com/events/2231758887213082">
                                <Button auto color="primary" rounded flat>
                                    Event
                                </Button>
                            </a>
                        </div>
                    </Card.Body>
                </Card>
                <Spacer h={2} />

                <Card
                    isHoverable
                    variant="bordered"
                    css={{ mw: '1000px' }}
                    className="mb-8"
                >
                    <Card.Body>
                        <div className="flex justify-between items-center">
                            <Text h2>Jun 3</Text>
                            <Text>Louisville, KY</Text>
                            <Text>High Horse Bar</Text>
                            <a href="https://www.facebook.com/events/825314895620505">
                                <Button auto color="primary" rounded flat>
                                    Event
                                </Button>
                            </a>
                        </div>
                    </Card.Body>
                </Card>
                <Spacer h={2} />

                <Card
                    isHoverable
                    variant="bordered"
                    css={{ mw: '1000px' }}
                    className="mb-8"
                >
                    <Card.Body>
                        <div className="flex justify-between items-center">
                            <Text h2>Jun 23</Text>
                            <Text>Louisville, KY</Text>
                            <Text>Headliners Music Hall</Text>
                            <a href="https://headlinerslouisville.com/event/mr-please-with-jpb-goose-after-party/headliners-music-hall/louisville-kentucky/">
                                <Button auto color="secondary" rounded flat>
                                    Tickets
                                </Button>
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
