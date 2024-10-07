import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bundo App",
    short_name: "Bundo",
    description: `Bundo is a retail & ecommerce technology company simplifying retail by bridging the  gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
