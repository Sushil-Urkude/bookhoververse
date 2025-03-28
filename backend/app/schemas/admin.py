from pydantic import BaseModel

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    id: str
    username: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str 