FROM python:3.11-slim

WORKDIR /app

# Dependências para o driver do Postgres
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o conteúdo da pasta server para a raiz do WORKDIR (/app)
COPY server/ .

EXPOSE 3000

CMD ["python", "main.py"]