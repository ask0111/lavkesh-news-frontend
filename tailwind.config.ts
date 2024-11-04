import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '2.5rem' }], // Adjust size and line height as needed
        'h2': ['1.875rem', { lineHeight: '2.25rem' }],
        'h3': ['1.5rem', { lineHeight: '2rem' }],
        'h4': ['1.25rem', { lineHeight: '1.75rem' }],
        'h5': ['1rem', { lineHeight: '1.25rem' }],
        'h6': ['0.85rem', { lineHeight: '1.1rem' }],
      },
      fontWeight: {
        'h1': '700', // Bold for h1
        'h2': '600',
        'h3': '500',
        'h4': '500',
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
