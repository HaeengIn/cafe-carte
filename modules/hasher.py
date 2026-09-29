from argon2 import PasswordHasher

HASHER = PasswordHasher()


def HashPassword(password: str) -> str:
    hashed_password = HASHER.hash(password)

    return hashed_password


def VerifyPasswordp(password: str, hashed_password: str) -> bool:
    return HASHER.verify(hashed_password, password)
