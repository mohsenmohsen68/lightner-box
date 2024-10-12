/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontFamily: {
        dana: "Dana Regular",
        "dana-medium": "Dana Medium",
        "dana-demiBold": "Dana DemiBold",
        moraba: "moraba regular",
        "moraba-medium": "moraba medium",
        "moraba-demiBold": "moraba demibold"
      }
    },
    plugins: []
  }
};
