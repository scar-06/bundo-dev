import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,

      screens: {
        custombp: { raw: "(max-height: 900px)" },
        "2xl": "1200px",
      },
    },
    screens: {
      xsm: "400px",
      xxsm: "435px",
      ssm: "480px",
      sm: "600px",
      md: "768px",
      xmd: "800px",
      xxmd: "850px",
      lg: "976px",
      xxlg: "1100px",
      xlg: "1224px",
      mxl: { max: "1279px" },
      // => @media (max-width: 1279px){...}

      mlg: { max: "1023px" },
      // => @media (max-width: 1023px){...}

      mmlg: { max: "976px" },
      // => @media (max-width: 1023px){...}

      mmd: { max: "767px" },
      // => @media (max-width: 767px){...}

      msm: { max: "639px" },
      // => @media (max-width: 639px){...}

      mxs: { max: "480px" },
      // => @media (max-width: 480px){...}

      mxxs: { max: "400px" },
      // => @media (max-width: 400px){...}
      mxxss: { max: "375px" },
      mxxssw: { max: "355px" },

      mxxxs: { max: "320px" },
      // => @media (max-width: 320px){...}

      "ms-height": { raw: "(max-height: 700px)" },

      "mxl-height": { raw: "(max-height: 850px)" },
    },
    extend: {
      fontFamily: {
        tv2SansDisplay: ["var(--font-tv2SansDisplay)", ...fontFamily.sans],
        lato: ["var(--font-lato)"],
      },
      fontSize: {
        // Header element styles
        "h-1": ["4rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-2": ["3.625rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-3": ["2.875rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-4": ["2.5rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-5": ["2.125rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-6": ["1.5rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-7": ["1.25rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-8": ["1.125rem", { lineHeight: "110%", fontWeight: 600 }],
        "h-9": ["0.875rem", { lineHeight: "110%", fontWeight: 600 }],

        // Small screen size header element styles
        "mxs-h-1": ["2.875rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-2": ["2rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-3": ["1.125rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-4": ["1rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-5": ["0.875rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-6": ["0.75rem", { lineHeight: "110%", fontWeight: 600 }],
        "mxs-h-7": ["0.625rem", { lineHeight: "110%", fontWeight: 600 }],

        // Body variant styles - [ Regular, Small]
        "mxs-body-1": ["1rem", { lineHeight: "140%", fontWeight: 600 }],
        "mxs-body-2": ["1rem", { lineHeight: "140%", fontWeight: 400 }],
        "mxs-body-3": ["0.875rem", { lineHeight: "140%", fontWeight: 600 }],
        "mxs-body-4": ["0.875rem", { lineHeight: "140%", fontWeight: 400 }],
        "mxs-body-5": ["0.75rem", { lineHeight: "140%", fontWeight: 600 }],
        "mxs-body-6": ["0.75rem", { lineHeight: "140%", fontWeight: 400 }],
        "mxs-body-7": ["0.625rem", { lineHeight: "140%", fontWeight: 600 }],
        "mxs-body-8": ["0.625rem", { lineHeight: "140%", fontWeight: 400 }],
        "mxs-body-9": ["0.5rem", { lineHeight: "140%", fontWeight: 600 }],
        // "body-12": ["0.5rem", { lineHeight: "140%", fontWeight: 400 }],
        "mxs-caption-s": ["0.5rem", { lineHeight: "140%", fontWeight: 400 }],

        // Body variant styles - [Large, Medium, ]
        "body-1": ["1.125rem", { lineHeight: "140%", fontWeight: 600 }],
        "body-2": ["1.125rem", { lineHeight: "140%", fontWeight: 400 }],
        "body-3": ["1rem", { lineHeight: "140%", fontWeight: 600 }],
        "body-4": ["1rem", { lineHeight: "140%", fontWeight: 400 }],
        "body-5": ["0.875rem", { lineHeight: "140%", fontWeight: 600 }],
        "body-6": ["0.875rem", { lineHeight: "140%", fontWeight: 400 }],
        "body-7": ["0.75rem", { lineHeight: "140%", fontWeight: 600 }],
        "body-8": ["0.75rem", { lineHeight: "140%", fontWeight: 400 }],
        "body-9": ["0.625rem", { lineHeight: "140%", fontWeight: 600 }],
        "body-10": ["0.625rem", { lineHeight: "140%", fontWeight: 400 }],
        "body-11": ["0.5rem", { lineHeight: "140%", fontWeight: 600 }],
        // "body-12": ["0.5rem", { lineHeight: "140%", fontWeight: 400 }],
        "caption-s": ["0.5rem", { lineHeight: "140%", fontWeight: 400 }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        primary: {
          "50": "var(--primary-50)",
          "100": "var(--primary-100)",
          "200": "var(--primary-200)",
          "300": "var(--primary-300)",
          "400": "var(--primary-400)",
          "500": "var(--primary-500)", // defualt  green color
          "600": "var(--primary-600)",
          "700": "var(--primary-700)",
          "800": "var(--primary-800)",
          "900": "var(--primary-900)",
          "950": "var(--primary-950)",
        },
        secondary: {
          "50": "var(--secondary-50)",
          "100": "var(--secondary-100)",
          "200": "var(--secondary-200)",
          "300": "var(--secondary-300)", // default secondary yellow
          "400": "var(--secondary-400)",
          "500": "var(--secondary-500)",
          "600": "var(--secondary-600)",
          "700": "var(--secondary-700)",
          "800": "var(--secondary-800)",
          "900": "var(--secondary-900)",
          "950": "var(--secondary-950)",
        },
        "tertiary-deep-green": {
          "100": "var(--tertiary-deep-green-100)",
          "200": "var(--tertiary-deep-green-200)",
          "300": "var(--tertiary-deep-green-300)",
          "400": "var(--tertiary-deep-green-400)",
          "500": "var(--tertiary-deep-green-500)",
          "600": "var(--tertiary-deep-green-600)",
          "700": "var(--tertiary-deep-green-700)",
          "800": "var(--tertiary-deep-green-800)",
          "900": "var(--tertiary-deep-green-900)",
          "950": "var(--tertiary-deep-green-950)", // default deep green color
        },
        "tertiary-blue": {
          "50": "var(--tertiary-blue-50)",
          "100": "var(--tertiary-blue-100)",
          "200": "var(--tertiary-blue-200)",
          "300": "var(--tertiary-blue-300)",
          "400": "var(--tertiary-blue-400)", // default tertiary-blue
          "500": "var(--tertiary-blue-500)",
          "600": "var(--tertiary-blue-600)",
          "700": "var(--tertiary-blue-700)",
          "800": "var(--tertiary-blue-800)",
          "900": "var(--tertiary-blue-900)",
          "950": "var(--tertiary-blue-950)",
        },
        "tertiary-red": {
          "50": "var(--tertiary-red-50)",
          "100": "var(--tertiary-red-100)",
          "200": "var(--tertiary-red-200)",
          "300": "var(--tertiary-red-300)",
          "400": "var(--tertiary-red-400)",
          "500": "var(--tertiary-red-500)",
          "600": "var(--tertiary-red-600)", // default tertiary-red
          "700": "var(--tertiary-red-700)",
          "800": "var(--tertiary-red-800)",
          "900": "var(--tertiary-red-900)",
          "950": "var(--tertiary-red-950)",
        },
        "tertiary-pale": {
          "50": "var(--tertiary-pale-50)",
          "100": "var(--tertiary-pale-100)", // default tertiary-pale
          "200": "var(--tertiary-pale-200)",
          "300": "var(--tertiary-pale-300)",
          "400": "var(--tertiary-pale-400)",
          "500": "var(--tertiary-pale-500)",
          "600": "var(--tertiary-pale-600)",
          "700": "var(--tertiary-pale-700)",
          "800": "var(--tertiary-pale-800)",
          "900": "var(--tertiary-pale-900)",
          "950": "var(--tertiary-pale-950)",
        },
        "tertiary-white": {
          "100": "var(--tertiary-white-100)", // default white color
          "200": "var(--tertiary-white-200)",
          "300": "var(--tertiary-white-300)",
          "400": "var(--tertiary-white-400)",
          "500": "var(--tertiary-white-500)",
          "600": "var(--tertiary-white-600)",
          "700": "var(--tertiary-white-700)",
          "800": "var(--tertiary-white-800)",
          "900": "var(--tertiary-white-900)",
          "950": "var(--tertiary-white-950)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
      matchUtilities(
        {
          "animation-delay": (value: string) => ({
            "animation-delay": value,
          }),
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".remove-tap-highlight": {
          "-webkit-tap-highlight-color": "transparent",
        },
        ".customeBoxShadow": {
          "box-shadow": "0px 0px 1px 0px #091E424F,0px 8px 12px 0px #091E4226",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;

export default config;
