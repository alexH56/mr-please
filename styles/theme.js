// 1. Import `createTheme`
import { createTheme, globalCss } from '@nextui-org/react';

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
    type: 'light', // it could be "light" or "dark"
    /* theme: {
        colors: {
            // brand colors
            primary: '#1D3362',
            primaryLight: '$blue200',
            primaryLightHover: '$blue300', // commonly used on hover state
            primaryLightActive: '$blue400', // commonly used on pressed state
            primaryLightContrast: '$blue600', // commonly used for text inside the component
            primaryBorder: '$blue500',
            primaryBorderHover: '$blue600',
            primarySolidHover: '$blue700',
            primarySolidContrast: '$white', // commonly used for text inside the component
            primaryShadow: '$blue500',

            secondary: '#D5202C',
            secondaryLight: '$red200',
            secondaryLightHover: '$red300', // commonly used on hover state
            secondaryLightActive: '$red400', // commonly used on pressed state
            secondaryLightContrast: '$red600', // commonly used for text inside the component
            secondaryBorder: '$red500',
            secondaryBorderHover: '$red600',
            secondarySolidHover: '$red700',
            secondarySolidContrast: '$white', // commonly used for text inside the component
            secondaryShadow: '$red500',

            // error
            error: '#D5202C',
        },
        space: {},
        fonts: {
            sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
            heading: `'Oswald', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
        },
    }, */
});

const overrides = globalCss({
    /*    h1: { fontFamily: 'Roboto' },
    h2: { fontFamily: 'Roboto' },
    h3: { fontFamily: 'Roboto' },
    h4: { fontFamily: 'Roboto' },
    h5: { fontFamily: 'Roboto' },
    h6: { fontFamily: 'Roboto' }, */
});

export { theme, overrides };
