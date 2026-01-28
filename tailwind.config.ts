import type { Config } from "tailwindcss"

const primaryColor       = process.env.THEME_COLOR_PRIMARY     || '#0F715D';
const primaryAltColor    = process.env.THEME_COLOR_PRIMARY_ALT || '#0C5A4B';
const onPrimaryColor     = process.env.THEME_COLOR_ON_PRIMARY     || '#FFFFFF';
const onPrimaryAltColor  = process.env.THEME_COLOR_ON_PRIMARY_ALT || '#FFFFFF';
const highlightColor     = process.env.THEME_COLOR_HIGHLIGHT   || '#10b981';

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "lg:grid-cols-5",
    "lg:grid-cols-4",
    "lg:grid-cols-3",
    "lg:grid-cols-2",
    "lg:grid-cols-1",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mosqueBrand: {
          highlight: highlightColor,
          DEFAULT: primaryColor,
          primary: primaryColor,
          primaryAlt: primaryAltColor,
          onPrimary: onPrimaryColor,
          onPrimaryAlt: onPrimaryAltColor,
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: primaryColor,
          foreground: onPrimaryColor,
        },
        secondary: {
          DEFAULT: primaryAltColor,
          foreground: onPrimaryAltColor,
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: highlightColor,
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ["calc(0.75rem * var(--font-scale, 1))", { lineHeight: "1rem" }],
        sm: [
          "calc(0.875rem * var(--font-scale, 1))",
          { lineHeight: "1.25rem" },
        ],
        base: ["calc(1rem * var(--font-scale, 1))", { lineHeight: "1.5rem" }],
        lg: [
          "calc(1.125rem * var(--font-scale, 1))",
          { lineHeight: "1.75rem" },
        ],
        xl: ["calc(1.25rem * var(--font-scale, 1))", { lineHeight: "1.75rem" }],
        "2xl": ["calc(1.5rem * var(--font-scale, 1))", { lineHeight: "2rem" }],
        "3xl": [
          "calc(1.875rem * var(--font-scale, 1))",
          { lineHeight: "2.25rem" },
        ],
        "4xl": [
          "calc(2.25rem * var(--font-scale, 1))",
          { lineHeight: "2.5rem" },
        ],
        "5xl": ["calc(3rem * var(--font-scale, 1))", { lineHeight: "1" }],
        "6xl": ["calc(3.75rem * var(--font-scale, 1))", { lineHeight: "1" }],
        "7xl": ["calc(4.5rem * var(--font-scale, 1))", { lineHeight: "1" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
