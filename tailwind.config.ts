import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#4338CA",
              foreground: "#EEEEEE",
            },
            secondary: {
              DEFAULT: "#C7D2FE",
              foreground: "#4338CA",
            },
            warning: {
              DEFAULT: "#FECACA",
              foreground: "#B91C1C",
            },
          },
        },
      },
    }),
  ],
}
