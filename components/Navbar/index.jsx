/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text,
} from '@chakra-ui/react';
// eslint-disable-next-line import/no-named-default
import { default as NextLink } from 'next/link';

import MenuItems from './MenuItems';

import Logo from '../components/Logo';

function NavLink({ children, href }) {
    return (
        <Link as={NextLink} key={href} href={href}>
            <Text className="text-black font-bold hover:underline hover:cursor-pointer">
                {children}
            </Text>
        </Link>
    );
}

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const menuList = MenuItems.map((link) => (
        <NavLink href={link.href} key={link.href}>
            {link.text}
        </NavLink>
    ));

    const mobileMenu = isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
                {MenuItems.map((link) => (
                    <NavLink href={link.href} key={link.href}>
                        {link.text}
                    </NavLink>
                ))}
            </Stack>
        </Box>
    );

    return (
        <Box
            // bg={useColorModeValue('ittBlue.900', 'ittBlue.900')}
            px={4}
        >
            <Flex h={20} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems="center">
                    <Logo />

                    <HStack
                        as="nav"
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {menuList}
                    </HStack>
                </HStack>
                <Flex alignItems="center">
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={0}
                        >
                            <Avatar size="md" src="" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>My Profile</MenuItem>
                            <MenuItem>Support</MenuItem>
                            <MenuDivider />
                            <MenuItem
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                }}
                            >
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            {mobileMenu}
        </Box>
    );
}
