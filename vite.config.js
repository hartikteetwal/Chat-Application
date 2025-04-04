import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  daisyui:{
    themes:[
      "light","dark","cupcake","retro"
    ]
  },
  define: {
    'process.env': {},
  },
});