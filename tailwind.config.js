/* eslint-disable global-require */

module.exports = {
    content: [
        'components/**/*.{js,ts,jsx,tsx}',
        'features/**/*.{js,ts,jsx,tsx}',
        'layouts/**/*.{js,ts,jsx,tsx}',
        'pages/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    options: {
        safelist: ['dark'], // specific classes
    },
    theme: {
        extend: {
            animation: {
                hop: 'hop 0.65s ease-in-out 1',
            },
            colors: {},
            borderRadius: {
                none: '0px',
                full: '9999px',
                DEFAULT: '0.25rem',
            },
            keyframes: {
                hop: {
                    '0%': { transform: 'translate(0%, 0%)' },
                    '35%': { transform: 'translate(0%, -25%)' },
                    '80%': { transform: 'translate(0%, 15%)' },
                    '100%': { transform: 'translate(0%, 0%)' },
                },
            },
            outline: {
                none: ['1px solid transparent', '2px'],
                white: ['1px dotted white', '2px'],
                black: ['1px dotted black', '2px'],
            },
            boxShadow: {
                dark: '0 1px 3px 0 rgba(0, 0, 0, 0.7), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
            },
        },
        fontFamily: {
            sans: [
                'Inter',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            accent: [
                'Poppins',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
        },
    },
    variants: {
        extend: {
            animation: ['hover'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
};
