import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configuração do CORS para o Vite (porta 8080 ou 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique as URLs permitidas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# Inicialização do Banco de Dados
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Ler o schema.sql que já criamos
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        with open(schema_path, "r") as f:
            cur.execute(f.read())
        conn.commit()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {e}")
    finally:
        cur.close()
        conn.close()

init_db()

@app.get("/api/content")
async def get_all_content():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute("SELECT key, data FROM site_content")
        rows = cur.fetchall()
        content = {row['key']: row['data'] for row in rows}
        return content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

@app.post("/api/content/{section}")
async def update_content(section: str, data: dict):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            """
            INSERT INTO site_content (key, data, updated_at) 
            VALUES (%s, %s, NOW()) 
            ON CONFLICT (key) 
            DO UPDATE SET data = %s, updated_at = NOW()
            """,
            (section, json.dumps(data), json.dumps(data))
        )
        conn.commit()
        return {"success": True, "section": section}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
