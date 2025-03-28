from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from ..core.config import SECRET_KEY, ALGORITHM
from ..schemas.admin import AdminLogin, AdminResponse, Token

router = APIRouter()

# This would typically be in a database
ADMIN_CREDENTIALS = {
    "username": "admin",
    "password": "admin123",
    "id": "1",
    "role": "admin"
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != ADMIN_CREDENTIALS["username"]:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return ADMIN_CREDENTIALS

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != ADMIN_CREDENTIALS["username"] or form_data.password != ADMIN_CREDENTIALS["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=AdminResponse)
async def read_admin_me(current_admin: dict = Depends(get_current_admin)):
    return current_admin

@router.post("/verify-token")
async def verify_token(current_admin: dict = Depends(get_current_admin)):
    return {"valid": True} 