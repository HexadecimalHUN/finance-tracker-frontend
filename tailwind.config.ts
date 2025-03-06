import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        themePurple: '#29132D',
        themeIndigo: '#36355a',
        themeDarkBlue1: '#365c85',
        themeDarkBlue2: '#2c85a9',
        themeLightBlue1: '#34afc2',
        themeLightBlue2: '#62d9d0',

        genericPurpleGradient1: '#662c48',
        genericPurpleGradient2: '#a54d55',
        genericPurpleGradient3: '#a54d55',
        genericPurpleGradient4: '#d77c57',
        genericPurpleGradient5: '#f5b659',
        genericPurpleGradient6: '#f9f871'
      },
      spacing:{
          '90r' : '90rem',
          '70r' : '70rem',
          '60r' : '60rem',
          '40r' : '40rem',
          '35r' : '30rem',
          '30r' : '25rem',
      },
      fontFamily:{
        serif: ['"Source Serif 4"', 'serif'],
      },
      borderWidth: {
        '2' : '2px',
        '3' : '3px',
        '4' : '4px',
      }
      
    },
   
  },
  plugins: [],
};
export default config;
