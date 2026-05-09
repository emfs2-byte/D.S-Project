# 🧪 Guia de Testes do Projeto

Este projeto utiliza **Vitest** para testes unitários e de integração.

## 🚀 Comandos
- `npm test`: Inicia os testes em modo interativo (Watch).
- `npm run test:ui`: Abre a interface visual do Vitest.
- `npm run test:coverage`: Gera relatório de cobertura na pasta `/coverage`.

## 📁 Estrutura de Arquivos
- Os testes devem ser criados com o sufixo `.test.ts` ou `.test.tsx`.
- Recomendamos manter os testes na mesma pasta do componente/função que está sendo testado.
- **Exemplo:** - `src/services/auth.ts`
  - `src/services/auth.test.ts`

## 📏 Regras do MVP
1. Nenhuma feature é considerada "Pronta" (Done) sem pelo menos 1 teste associado.
2. O coverage global não deve cair abaixo de **80%** (idealmente).