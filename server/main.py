import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configuração do CORS para o Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# Inicialização do Banco de Dados
def init_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Ler o schema.sql que já criamos
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        if os.path.exists(schema_path):
            with open(schema_path, "r") as f:
                cur.execute(f.read())
            conn.commit()
            print("Database initialized successfully")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error initializing database: {e}")

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

# Servir arquivos estáticos do diretório 'dist'
# O diretório 'dist' deve estar no mesmo nível que este arquivo ou no WORKDIR do Docker
if os.path.exists("dist"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        
        # Se o arquivo existir no dist (como favicon.ico, etc), serve o arquivo
        file_path = os.path.join("dist", full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Caso contrário, serve o index.html (React Router)
        return FileResponse("dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
