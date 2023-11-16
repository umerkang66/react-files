/** @type {import('vite').UserConfig} */
export default {
  server: {
    proxy: {
      '/trpc': {
        target: 'http://localhost:3000',
      },
    },
  },
};
