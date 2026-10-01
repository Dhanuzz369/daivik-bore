import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daivik Borewells",
    short_name: "Daivik",
    description: "Borewell drilling and complete water solutions across Bangalore.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6f1",
    theme_color: "#244f43",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
