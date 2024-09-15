/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "540px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      screens: {
        sm: "850px",
        md: "988px",
        lg: "1100px",
        xl: "1290px",
        "2xl": "1650px",
      },
    },
    extend: {
      colors: {
        headerAndNav: "var(--headerAndNav)",
        headingsColor: "var(--headings-color)",
        inputBackground: "var(--input-background)",
        navTextColor: "var(--navbar-p-color)",
        bannerTextColor: "var(--banner-text-color)",
        primaryColor: "var(--primary)",
        otherPrimaryColor: "var(--primary-variant)",
        surface: "var(--surface)",
        barsLens: "var(--bars-lens)",
        otherTextColor: "var(--text-color)",
        navbarHover: "var(--navbar-p-color-hover)",
        myBackground: "var(--background)",
        ratingColor: "var(--rating-color)",
        loaderBg: "var(--loader-bg)",
        skeletonColor: "var(--skeletonColor)",
      },
    },
  },
};
