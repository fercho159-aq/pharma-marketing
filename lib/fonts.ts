import { Lato, DM_Serif_Display } from "next/font/google";

export const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});
