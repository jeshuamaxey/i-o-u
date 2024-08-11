// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import uiConfig from "@repo/ui/tailwind.config"

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [uiConfig],
};

export default config;