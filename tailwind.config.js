import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        peerlist: "rgb(var(--peerlist))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
    animation: {
      circling: {
        "0%": {
          transform:
            "rotate(calc(var(--circling-offset) * 1deg)) translate(calc(var(--circling-radius) * 1px), 0) rotate(calc(var(--circling-offset) * -1deg))",
        },
        "100%": {
          transform:
            "rotate(calc(360deg + (var(--circling-offset) * 1deg))) translate(calc(var(--circling-radius) * 1px), 0) rotate(calc(-360deg + (var(--circling-offset) * -1deg)))",
        },
      },
      "background-gradient": {
        "0%, 100%": {
          transform: "translate(0, 0)",
          animationDelay: "var(--background-gradient-delay, 0s)",
        },
        "20%": {
          transform:
            "translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))",
        },
        "40%": {
          transform:
            "translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))",
        },
        "60%": {
          transform:
            "translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))",
        },
        "80%": {
          transform:
            "translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
