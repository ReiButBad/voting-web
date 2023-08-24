/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    darkTheme: false,
    themes: ["light", "dark"],
    prefix: "dui-"
  }
}

