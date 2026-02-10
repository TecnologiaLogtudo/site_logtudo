# Estágio de Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de Produção
FROM node:20-alpine
WORKDIR /app
# Instala o servidor estático 'serve'
RUN npm install -g serve
# Copia apenas o resultado do build
COPY --from=build /app/dist ./dist

# Porta padrão do 'serve'
EXPOSE 8080

# O comando -s (single) redireciona todas as rotas para o index.html (essencial para React Router)
CMD ["serve", "-s", "dist", "-l", "8080"]
