// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Add all files where Tailwind should look for class names
    ],
    theme: {
        extend: {
          boxShadow: {
            'custom-light': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    plugins: [],
  }
  