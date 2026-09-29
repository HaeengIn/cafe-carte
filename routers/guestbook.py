from fastapi import APIRouter, Request
from auto_template import setup_templates

from modules.database import get_connection
from pydantic import BaseModel

from modules.hasher import HashPassword

router = APIRouter()
templates = setup_templates(directory="templates")


class GuestbookCreate(BaseModel):
    author: str
    content: str
    password: str


@router.get("/guestbook")
async def index(request: Request):
    title = "방명록 - 카페 카르테"

    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, author, content, created_at, fixed_count, last_fixed FROM guestbook ORDER BY created_at DESC
                """)

            guestbooks = cursor.fetchall()

    context = {
        "title": title,
        "guestbooks": guestbooks
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="guestbook.html",
    )


@router.post("/guestbook")
def create_guestbook(data: GuestbookCreate):
    hashed_password = HashPassword(data.password)

    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO guestbook (author, content, password) VALUES (%s, %s, %s) RETURNING id, author, content, created_at, fixed_count, last_fixed
                """,
                (
                    data.author,
                    data.content,
                    hashed_password,
                ),
            )

            return cursor.fetchone()
