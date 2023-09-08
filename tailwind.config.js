/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
      darkTheme: false,
      themes: [{ light: {
        "primary": "#0284c7",
        "secondary": "#059669",
        "accent": "#7c3aed",
        "neutral": "#1f2937",
        "base-100": "#e7e5e4",
        "info": "#1e3a8a",
        "success": "#4d7c0f",
        "warning": "#9a3412",
        "error": "#991b1b"
      }},],
      prefix: "dui-"
  }
}

