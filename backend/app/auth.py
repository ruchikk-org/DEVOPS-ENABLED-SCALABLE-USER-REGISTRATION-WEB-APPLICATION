from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os

from dotenv import load_dotenv

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User


# Load environment variables
load_dotenv()


# Password hashing configuration
password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
)


# Reads Authorization: Bearer <token>
oauth2_scheme = HTTPBearer()



# -------------------------------
# Password Hashing
# -------------------------------

def hash_password(password: str):

    return password_context.hash(password)



def verify_password(
    plain_password: str,
    hashed_password: str
):

    return password_context.verify(
        plain_password,
        hashed_password
    )



# -------------------------------
# JWT Token Creation
# -------------------------------

def create_access_token(data: dict):

    to_encode = data.copy()


    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )


    to_encode.update(
        {
            "exp": expire
        }
    )


    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return encoded_jwt



# -------------------------------
# Get Current Logged-in User
# -------------------------------

def get_current_user(
    credentials = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )


    try:

        token = credentials.credentials


        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        email = payload.get("sub")


        if email is None:
            raise credentials_exception


    except JWTError:

        raise credentials_exception



    user = db.query(User).filter(
        User.email == email
    ).first()



    if user is None:

        raise credentials_exception



    return user