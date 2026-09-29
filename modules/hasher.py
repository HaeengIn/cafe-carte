from argon2 import PasswordHasher

HASHER = PasswordHasher()


def HashPassword(password):
    hashed_password = HASHER.hash(password)

    return hashed_password
