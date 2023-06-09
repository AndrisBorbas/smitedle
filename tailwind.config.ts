import aspectRatio from "@tailwindcss/aspect-ratio";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{js,ts,tsx,scss,css}"],
	theme: {
		extend: {
			transitionTimingFunction: {
				DEFAULT: defaultTheme.transitionTimingFunction.out,
				slide: "cubic-bezier(.19,1,.22,1)",
			},
			colors: {
				accent: {
					DEFAULT: "#85784a",
				},
			},
			backgroundImage: {
				smite: "url('/images/bg.webp')",
			},
			boxShadow: {
				glow: "0 0 7px rgba(255, 255, 255, 0.5)",
			},
			dropShadow: {
				glow: "0 0 7px rgba(255, 255, 255, 0.5)",
			},
			fontFamily: {},
		},
	},
	plugins: [aspectRatio],
} satisfies Config;
