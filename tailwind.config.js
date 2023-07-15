/** @type {import('tailwindcss').Config} */
module.exports = {
  // future: {
  //   hoverOnlyWhenSupported: true
  // },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)'
      },
      aspectRatio: {
        '4/3': '4/3',
        '5/1.75': '5/1.75'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#4d1939'
        }
      }
    ]
  }
}
