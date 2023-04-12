import aspectRatio from "@tailwindcss/aspect-ratio";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{js,ts,tsx,scss,mdx}"],
	theme: {
		extend: {
			transitionTimingFunction: {
				DEFAULT: defaultTheme.transitionTimingFunction.out,
			},
			colors: {},
			fontFamily: {},
		},
	},
	plugins: [aspectRatio],
} satisfies Config;
