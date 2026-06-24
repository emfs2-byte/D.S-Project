# Usa uma imagem oficial do Node.js (versão 18, muito estável)
FROM node:18-alpine

# Define a pasta de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependências primeiro (ajuda no cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do backend
COPY . .

# Expõe a porta 5000 que sua API usa
EXPOSE 5000

# Comando para iniciar o servidor em produção
CMD ["node", "src/server.js"]