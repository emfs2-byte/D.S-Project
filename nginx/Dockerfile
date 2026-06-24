# Estágio 1: build do frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY Front/package*.json ./
RUN npm install
COPY Front/ .
ARG VITE_API_URL=/NPI/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Estágio 2: Nginx servindo o frontend e proxy reverso
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html/NPI