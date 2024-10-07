import { Lato } from "next/font/google";
import localFont from "next/font/local";

const tv2SansDisplay = localFont({
  src: [
    {
      path: "./tv2SansDisplay/TV2SansDisplay-Thin.woff2",
      style: "normal",
      weight: "100",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-ExtraLight.woff2",
      style: "normal",
      weight: "200",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-SemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./tv2SansDisplay/TV2SansDisplay-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],

  variable: "--font-tv2SansDisplay",
});

export default tv2SansDisplay;

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});
