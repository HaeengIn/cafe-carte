from fastapi import APIRouter, Request, HTTPException
from auto_template import setup_templates
from modules.database import get_connection
from modules.hasher import HashPassword, VerifyPassword
from pydantic import BaseModel, Field
from typing import Any, cast
from getKST import getKST

router = APIRouter()
templates = setup_templates(directory="templates")


class CreateGuestbook(BaseModel):
    author: str = Field(max_length=20)
    content: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=20)


class EditGuestbook(BaseModel):
    content: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=20)


@router.get("/guestbook")
async def index(request: Request):
    title = "방명록 - 카페 카르테"

    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, author, content, created_at, fixed_count, last_fixed
                FROM main
                ORDER BY created_at DESC
            """)

            guestbooks = cast(list[dict[str, Any]], cursor.fetchall())

    for guestbook in guestbooks:
        guestbook["created_at"] = guestbook["created_at"].strftime("%Y-%m-%d %H:%M:%S")

        if guestbook["last_fixed"]:
            guestbook["last_fixed"] = guestbook["last_fixed"].strftime(
                "%Y-%m-%d %H:%M:%S"
            )

    context = {
        "title": title,
        "guestbooks": guestbooks,
    }

    return templates.TemplateResponse(
        request=request,
        context=context,
        name="guestbook.html",
    )


@router.post("/guestbook")
def create_guestbook(data: CreateGuestbook):
    hashed_password = HashPassword(data.password)

    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO main (author, content, password) VALUES (%s, %s, %s) RETURNING id, author, content, created_at, fixed_count, last_fixed
                """,
                (
                    data.author,
                    data.content,
                    hashed_password,
                ),
            )

            return cursor.fetchone()


@router.post("/guestbook/edit/{id}")
def edit_guestbook(data: EditGuestbook, id: int):
    KST = getKST()

    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT password FROM main WHERE id = %s""",
                (id,),
            )
            guestbook = cursor.fetchone()

            if guestbook is None:
                raise HTTPException(
                    status_code=404,
                    detail="방명록을 찾을 수 없습니다.",
                )

            if not VerifyPassword(data.password, guestbook["password"]):  # type: ignore
                raise HTTPException(
                    status_code=403,
                    detail="비밀번호가 일치하지 않습니다.",
                )

            cursor.execute(
                """UPDATE main SET content = %s, fixed_count = fixed_count + 1, last_fixed = %s WHERE id = %s RETURNING id, author, content, created_at, fixed_count, last_fixed""",
                (
                    data.content,
                    KST,
                    id,
                ),
            )

            return cursor.fetchone()
