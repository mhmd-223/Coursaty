/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#ECF4D6',
        lightGreen: '#9AD0C2',
        darkTurquoise: '#2D9596',
        darkSlateBlue: '#265073',
        darkBackground: '#1A202C',
        lightBackground: '#F2F2F2',
        /* Using a color palette, the convention will be cp-1, cp-2.. from primary to secondry */
        'cp-1': '#E3FDFD',
        'cp-2': '#CBF1F5',
        'cp-3': '#A6E3E9',
        'cp-4': '#71C9CE',
        /* for dark mode */
        'cpd-1': '#222831',
        'cpd-2': '#393E46',
        'cpd-3': '#00ADB5',
        'cpd-4': '#EEEEEE'
      }
    },
  },
  plugins: [
  ],
}