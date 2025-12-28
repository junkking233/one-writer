from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="One-Writer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to One-Writer API"}

if __name__ == "__main__":
    import uvicorn
    # In dev, we can run this file directly
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
