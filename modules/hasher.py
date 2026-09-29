from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

HASHER = PasswordHasher()


def HashPassword(password: str) -> str:
    hashed_password = HASHER.hash(password)

    return hashed_password


def VerifyPassword(password: str, hashed_password: str) -> bool:
    try:
        return HASHER.verify(hashed_password, password)
    except VerifyMismatchError:
        return False
