import sqlite3
from fastapi import APIRouter, Request
from template_config import templates

members_router = APIRouter(prefix="/members", redirect_slashes=True)


@members_router.get("/")
async def index(request: Request):
    title = "MEMBERS - Cafe Carte"

    context = {
        "title": title,
    }

    return templates.TemplateResponse(
        request=request, context=context, name="members/index.html"
    )


@members_router.get("/{member}")
async def member_page(request: Request, member: str):
    MEMBER_LIST = [
        "mocoparfe",
        "hanseorin",
        "dangkey",
        "uuhee",
        "aerusolstice",
    ]
    MEMBER_MAP = {
        "mocoparfe": "모코 파르페",
        "hanseorin": "한서린",
        "dangkey": "댕키",
        "uuhee": "유우희",
        "aerusolstice": "에루 솔스티스",
    }

    if member in MEMBER_LIST:
        conn = sqlite3.connect("static/data/members.db")
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM info")
        rows = cursor.fetchall()

        title = f"{MEMBER_MAP[member]} - Cafe Carte"

        context = {
            "title": title,
            "items": rows
        }

        return templates.TemplateResponse(
            request=request, context=context, name="members/view.html"
        )
    else:
        title = "MEMBER NOT FOUND"
        error = "멤버를 찾을 수 없습니다. URL을 확인해주세요."

        context = {
            "title": title,
            "error": error,
        }

        return templates.TemplateResponse(
            request=request, context=context, name="404.html"
        )
