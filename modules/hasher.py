from argon2 import PasswordHasher

HASHER = PasswordHasher()


def HashPassword(password: str) -> str:
    hashed_password = HASHER.hash(password)

    return hashed_password
