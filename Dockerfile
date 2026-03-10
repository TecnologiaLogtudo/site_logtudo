# Estágio de Build do Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# O build do Vite pode falhar se faltarem arquivos públicos ou de configuração
RUN npm run build

# Estágio de Produção (Backend + Frontend)
FROM python:3.11-slim

WORKDIR /app

# Dependências para o driver do Postgres e curl para healthcheck
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências do Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o resultado do build do frontend
COPY --from=frontend-build /app/dist ./dist

# Copiar o código do backend
COPY server/ .

EXPOSE 3000

# Comando para rodar a aplicação
CMD ["python", "main.py"]
