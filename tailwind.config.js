/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                'shein-blue': '#0058a3',
                'shein-green': '#28a745',
                'shein-dark': '#222222',
                'shein-light': '#f5f5f5',
                'pharmeasy-teal': '#10847e', // Legacy for transition
            },
            fontFamily: {
                'outfit': ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
