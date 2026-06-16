import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Permite usar 'describe', 'it', 'expect' sem importar em todo arquivo
    globals: true, 
    // Simula o ambiente de navegador para testes de componentes React
    environment: 'jsdom', 
    
    // Define onde os testes estão localizados 
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],

    // Configurações de cobertura de código
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      // Arquivos que não devem contar na cobertura 
      exclude: [
        'node_modules/',
        'Front/src/main.tsx',
        'Front/src/vite-env.d.ts',
      ],
    },
    
    // Atalho para resolver imports
    alias: {
      '@': path.resolve(__dirname, './Front/src'),
      // Atalho pro backend depois, é só usar a linha abaixo:
      // '@backend': path.resolve(__dirname, './backend/src'),
    },
  },
});